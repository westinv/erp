import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {

  public async store({ request, response }: HttpContextContract) {
    try {
      const pdvId = request.header('pdvId')
      const { description, price, name, shipping, discount,quantity } = request.body();
      const products = await Product.create({
        description,
        price,
        name,
        shipping,
        discount,
        quantity,
        pdvId,
      });

      return products;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async index({response}: HttpContextContract) {

    try {
      const products = await Product.all()
      return products;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const products = await Product.find(params.id);
      return products;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findproducts = await Product.find(params.id);
      const dados = request.body();
      if (findproducts) {
        findproducts.merge(dados);
        await findproducts.save();
      }

    return findproducts;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findproducts = await Product.find(params.id);

    if(!findproducts)
      return response.status(404);
    await findproducts.delete();
  }

  public async indexByPdvId({response, request}: HttpContextContract) {

    const pdvId = request.header('pdvId')

    if(!pdvId){
      return response.status(400).json({message: "Esqueceu de passar"})
    }

     try {
      const products = await Product.query().where('pdvId', pdvId)
      return products;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

}
