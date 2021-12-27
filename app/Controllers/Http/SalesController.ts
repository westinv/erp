import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KitProduct from 'App/Models/KitProduct';
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';

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
  pdvId?: number,
  clientId?: number,
}

async function StoreKitId(kitId, quantity, pdvId, clientId) {

  const sale = await Sale.create({
    quantity: quantity,
    kitId: kitId,
    pdvId: pdvId,
    clientId: clientId,
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

async function StoreProductId(pdvId, quantity, productId, clientId) {

  const sale = await Sale.create({
    clientId: clientId,
    pdvId: pdvId,
    productId: productId,
    quantity: quantity
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

  public async carrinho({ response, request }: HttpContextContract) {

    const { kits, products, pdvId, clientId }: ICArrinho = request.body()

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
      StoreProductId(pdvId, laodQuantity, loadIds, clientId)
    }

    for (let j = 0; j < kits.array.length; j++) {
      const loadkitIds = foundKitIds[j]
      const laodkitQuantity = foundkitQuantity[j]
      StoreKitId(loadkitIds, laodkitQuantity, pdvId, clientId)
    }
  }

}
