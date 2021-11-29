import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cost from 'App/Models/Cost';

export default class CostsController {

  public async store({request, response }: HttpContextContract) {

    try {
      const { description, price, pdvId } = request.body()
      const cost = await Cost.create({
        description,
        price,
        pdvId
      });
      return cost;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async index({response}: HttpContextContract) {
    try {
      const cost = await Cost.all();
      return cost;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const cost = await Cost.find(params.id);
      return cost;
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findcost = await Cost.find(params.id);
      const dados = request.body()

      if (findcost) {
        findcost.merge(dados);
        await findcost.save();
      }
      return findcost;
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findcost = await Cost.find(params.id);

    if(!findcost)
      return response.status(404);
    await findcost.delete();
  }

}


