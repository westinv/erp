import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KitProduct from 'App/Models/KitProduct';
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';

interface IStoreKit{
  kits?: {
    array: [{
    kitId: number,
    quantity: number,

    }],
    pdvId: number,
    clientId: number,


  }
}

interface IStoreProduct{
  products?: {
    array: [{
    productId: number,
    quantity: number
    }],
    pdvId: number,
    clientId: number,
  }
}


/* interface ICArrinho{
  kits?: {
    array: [{
    kitId?: number,
    quantity?: number
    }]
  }

  products: {
    array: [{
    productId: number,
    quantity: number
    }]
  }
} */

export default class SalesController {

public async StoreKitId({response,request }: HttpContextContract) {
 try {
  const { kits }: IStoreKit = request.body();
   if(!kits){
    return response.status(400).json({message: "Esqueceu de passar kitId"})
  }

  const foundIds = kits.array.map((kit)=>{
    return kit.kitId
  })
  const foundQuantity = kits.array.map((kit)=>{
    return kit.quantity
  })
  
  const loadIds = foundIds[0]
  const laodQuantity = foundQuantity[0]

  const sale = await Sale.create({
    quantity: laodQuantity,
    kitId: loadIds,
    pdvId: kits.pdvId,
    clientId: kits.clientId
  });

  const kitProduct = await KitProduct.query().where('kit_id', loadIds)
  const showKitProduct = kitProduct.map(async (product) =>{
    const subtrationKit = product.$attributes.productId
      const findQuantity = kits.array.map((kit)=>{
        return kit.quantity
      })
      const [item] = await Product.query().where('id', subtrationKit)
      const laodQuantity = foundQuantity[0]
      if(!findQuantity){
        return response.status(400).json({message: "Esqueceu de passar quantidade"})
      }
      const subtration = item.quantity - laodQuantity
      await Sale.query().from('products').where('id',subtrationKit ).update({quantity: subtration})
      return showKitProduct
    })
    return sale

  } catch (error) {
    return response.status(404).json({message: error.message})
  }
}

 public async StoreProductId({response,request }: HttpContextContract) {
  try {

  const {products}: IStoreProduct = request.body();
  if(!products){
   return response.status(400).json({message: "Esqueceu de passar productId"})
 }
 const foundIds = products.array.map((product)=>{
  return product.productId
  })

  const foundQuantity = products.array.map((product)=>{
  return product.quantity
  })

  const loadIds = foundIds[0]
  const laodQuantity = foundQuantity[0]

  const sale = await Sale.create({
    clientId: products.clientId,
    pdvId: products.pdvId,
    productId: loadIds,
    quantity: laodQuantity
  });

  const findProduct = await Product.query().where('id', loadIds)
  const showProduct = findProduct.map(async (product) => {
  const subtrationProduct = product.$attributes.id
  const findQuantity = products.array.find(teste => teste.productId === subtrationProduct )
  if(!findQuantity){
    return response.status(400).json({message: "Esqueceu de passar quantidade"})
  }
  const subtration = product.$attributes.quantity - findQuantity?.quantity
  await Sale.query().from('products').where('id', subtrationProduct ).update({quantity: subtration})
  return showProduct
  })
  return sale
}
  catch (error) {
    return response.status(404).json({message: error.message})
  }
}

  public async index({response}: HttpContextContract) {

    try {
      const sale = await Sale.all();
    return sale;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const sale = await Sale.find(params.id)

      await sale?.load('kit', loader => loader.preload('kitProduct'))
      await sale?.load('product')
      return sale
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }

  public async update({ response,request, params }: HttpContextContract) {
    try {
      const findSale = await Sale.find(params.id);
      const dados = request.body()

      if (findSale) {
        findSale.merge(dados);
        await findSale.save();
        return findSale;
      }
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }

  public async destroy({ params,  response }: HttpContextContract) {
    const findSale = await Sale.find(params.id);
      if(!findSale)
      return response.status(404);
      await findSale.delete();
  }

}
