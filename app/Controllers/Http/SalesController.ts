import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sale from 'App/Models/Sale';

export default class SalesController {
  public async store({ request, response }: HttpContextContract) {

    try {
      const {pdvsId,clientId, kitsId, productId} = request.body()

      const sale = await Sale.create({
        pdvsId,
        clientId,
        kitsId,
        productId
      });
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
