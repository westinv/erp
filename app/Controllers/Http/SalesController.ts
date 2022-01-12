import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthMiddleware from 'App/Middleware/Auth';
import Account from 'App/Models/Account';
import KitProduct from 'App/Models/KitProduct';
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';
import Salesman from 'App/Models/Salesman';
import authConfig from 'Config/auth';

interface ICArrinho {
  kits?: {
    array: [{
      kitId?: number[],
      quantity?: number
    }]
  },
  products?: {
    array: [{
      productId: number[],
      quantity: number
    }]
  },
  discount?: number
  shipping?: number
  pdvId?: number,
  clientId?: number,
}

async function StoreKitId(kitId, quantity, pdvId, clientId, discount, shipping, auth) {

  const sale = await Sale.create({
    quantity: quantity,
    kitId: kitId,
    pdvId: pdvId,
    clientId: clientId,
    discount: discount,
    shipping: shipping,
    accountId: auth.user instanceof Account ? auth.user.id : undefined,
    salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user?.salesmanId,
  });

  const kitProduct = await KitProduct.query().where('kit_id', kitId)
  const showKitProduct = kitProduct.map(async (product) => {
    const subtrationKit = product.$attributes.productId
    const [item] = await Product.query().where('id', subtrationKit)
    const subtration = item.quantity - quantity
    await Sale.query().from('products').where('id', subtrationKit).update({ quantity: subtration })
    return showKitProduct
  })
  return sale
}

async function StoreProductId(pdvId, quantity, productId, clientId, discount, shipping, auth) {

  const sale = await Sale.create({
    clientId: clientId,
    pdvId: pdvId,
    productId: productId,
    quantity: quantity,
    discount: discount,
    shipping: shipping,
    accountId: auth.user instanceof Account ? auth.user.id : undefined,
    salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user?.salesmanId,
  });

  const findProduct = await Product.query().where('id', productId)
  const showProduct = findProduct.map(async (product) => {
    const subtrationProduct = product.$attributes.id
    const subtration = product.$attributes.quantity - quantity
    await Sale.query().from('products').where('id', subtrationProduct).update({ quantity: subtration })
    return showProduct
  })
  return sale

}

export default class SalesController {


  public async index({ response }: HttpContextContract) {

    try {
      const sale = await Sale.all();
      return sale;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const sale = await Sale.find(params.id)

      await sale?.load('kit', loader => loader.preload('kitProduct'))
      await sale?.load('product')
      return sale
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    try {
      const findSale = await Sale.find(params.id);
      const dados = request.body()

      if (findSale) {
        findSale.merge(dados);
        await findSale.save();
        return findSale;
      }
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findSale = await Sale.find(params.id);
    if (!findSale)
      return response.status(404);
    await findSale.delete();
  }

  public async listByClient({ params }: HttpContextContract) {

    const { id } = params
    const listByClient = await Sale.query().where('client_id', `${id}`).preload('client')
    return listByClient
  }

  public async listByPdv({ params }: HttpContextContract) {

    const { id } = params
    const listByPdv = await Sale.query().where('pdv_id', `${id}`).preload('client')
    return listByPdv
  }


  public async carrinho({ response, request }: HttpContextContract) {

    const { kits, products, pdvId, clientId, discount, shipping }: ICArrinho = request.body()

    if (!pdvId || !clientId) {
      return response.status(400).json({ message: "Esqueceu de passar kitId ou productId" })
    }

    if (!kits || !products) {
      return response.status(400).json({ message: "Esqueceu de passar kitId ou productId" })
    }

    const foundIds = products.array.map((product) => {
      return product.productId
    })

    const foundQuantity = products.array.map((product) => {
      return product.quantity
    })

    const foundKitIds = kits.array.map((kit) => {
      return kit.kitId
    })
    const foundkitQuantity = kits.array.map((kit) => {
      return kit.quantity
    })

    for (let i = 0; i < products.array.length; i++) {
      const loadIds = foundIds[i]
      const laodQuantity = foundQuantity[i]
      StoreProductId(pdvId, laodQuantity, loadIds, clientId, discount, shipping, authConfig)
    }

    for (let j = 0; j < kits.array.length; j++) {
      const loadkitIds = foundKitIds[j]
      const laodkitQuantity = foundkitQuantity[j]
      StoreKitId(loadkitIds, laodkitQuantity, pdvId, clientId, discount, shipping, AuthMiddleware)
    }
  }

}
