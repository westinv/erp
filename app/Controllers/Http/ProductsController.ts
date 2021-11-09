import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {

  public async store({ request, response }: HttpContextContract) {
    try {
      const { description, price, name, freight, discount } = request.only([
        'description',
        'price',
        'name',
        'freight',
        'discount'
      ]);
      const products = await Product.create({
        description,
        price,
        name,
        freight,
        discount
      });

      return products;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async index({response}: HttpContextContract) {
    try {
      const products = await Product.all();
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
      const dados = request.only([
        'description',
        'price',
        'name',
        'freight',
        'discount'
    ]);

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


}
