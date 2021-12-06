import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KitProduct from 'App/Models/KitProduct';
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';

export default class SalesController {
  public async store({ request, response}: HttpContextContract) {
    try {
      const { pdvId,clientId, kitId, productId, saleQuantity }  = request.body()
      if(!kitId && !productId){
        return response.status(400).json({message: "Esqueceu de passar kitId ou productId"})
      }

      let itemType
      let genericId

      if(kitId){
        itemType = 'kits'
        genericId = kitId
      }else if(productId){
        itemType = 'products'
        genericId = productId
      }

      const [item] = await Product.query().from(`${itemType}`).where('id', `${genericId}`)

      if(!item){
        return response.status(400).json({message: "Esqueceu de passar typeItem"})
      }

      if((item.quantity - saleQuantity) < 0){
        return response.status(400).json({message: "A quantidade de produtos não tem no estoque"})
      }

      const sale = await Sale.create({
        pdvId,
        clientId,
        kitId,
        productId,
        saleQuantity
      });

      const subtraction =  item.quantity - saleQuantity

      if(productId){
        const findProduct = await Product.query().where('id', productId)
        const showProduct = await findProduct.map(async (product) => {
          const subtrationProduct = product.$attributes.id
          await Sale.query().from('products').where('id',subtrationProduct ).update({quantity: subtraction})
          return showProduct
        })
      }
      if(kitId){
        const kitProduct = await KitProduct.query().where('kit_id', kitId)
        const showKitProduct = kitProduct.map(async (product) =>{
        const subtrationKit = product.$attributes.productId
        await Sale.query().from('products').where('id',subtrationKit ).update({quantity: subtraction})
        })
        return showKitProduct
      }
      return sale;
    } catch (error) {
      return response.status(400).json({message: error.message})
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
