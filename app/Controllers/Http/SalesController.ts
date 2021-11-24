import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Sale from 'App/Models/Sale';

export default class SalesController {
  public async store({ request, response}: HttpContextContract) {
    try {
      const {pdvId,clientId, kitId, productId, saleQuantity} = request.body()

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

      const [item] = await Database
      .from(`${itemType}`)
      .where('id', `${genericId}`)


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

      await Database
      .from(`${itemType}`)
      .where('id', genericId)
      .update({quantity: subtraction})


      if(kitId){

        const [kit] = await Database
        .from('kit_products')
        .where('kit_id', genericId)
        console.log(kit)
        kit?.product_id.map(async (id) =>{
        await Database
        .from(`${itemType}`)
        .where('id', id)
        .update({quantity: subtraction})
        })

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
