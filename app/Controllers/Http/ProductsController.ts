import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Product from 'App/Models/Product';
import Salesman from 'App/Models/Salesman';

interface IProducts {
  description?: string,
  price?: number,
  name?: string,
  shipping?: number,
  discount?: number,
  quantity?: number,
  pdvId?: number,
}
export default class ProductsController {

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const pdvId = request.header('pdvId')
      const { description, price, name, shipping, discount, quantity }: IProducts = request.body();

      const products = await Product.create({
        description,
        price,
        name,
        shipping,
        discount,
        quantity,
        pdvId,
        accountId: auth.user instanceof Account ? auth.user.id : undefined,
        salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user?.salesmanId,
      });

      return products;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {

    try {
      const products = await Product.all()
      return products;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const products = await Product.find(params.id);
      return products;
    } catch (error) {
      return response.status(400).json({ message: error.message })
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
      return response.status(400).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findproducts = await Product.find(params.id);

    if (!findproducts)
      return response.status(404);
    await findproducts.delete();
  }

  public async indexByPdvId({ response, request }: HttpContextContract) {

    const pdvId = request.header('pdvId')
    if (!pdvId) {
      return response.status(400).json({ message: "Esqueceu de passar" })
    }

    try {
      const products = await Product.query().where('pdvId', pdvId)
      return products;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async showlistProducts({ auth }: HttpContextContract) {
    if (auth.user instanceof Salesman) {
      const pdv = await Product.query().where('salesman_id', auth.user.id)
      return pdv
    } else if (auth.user instanceof Account) {
      const pdv = await Product.query().where('account_id', auth.user.id)
      return pdv
    }
  }


}
