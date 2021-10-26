import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {

  public async store({ request }: HttpContextContract) {
    const { description } = request.only([
      'description'
    ]);
    const products = await Product.create({
      description
    });

    return products;
  }

  public async index({}: HttpContextContract) {
    const products = await Product.all();

    return products;
  }

  public async show({ params }: HttpContextContract) {
    const products = await Product.find(params.id);

    return products;
  }

  public async update({ request, params }: HttpContextContract) {
    const findproducts = await Product.find(params.id);
    const dados = request.only([
      'description'
    ]);

    if (findproducts) {
      findproducts.merge(dados);
      await findproducts.save();
    }

    return findproducts;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findproducts = await Product.find(params.id);

    if(!findproducts)
      return response.status(404);
    await findproducts.delete();
  }


}
