import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';
import Salesman from 'App/Models/Salesman';
import { DateTime } from 'luxon';

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
      return response.status(400).json({ message: "Id do ponto de venda incorreto ou inexistente!" })
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

  public async productChart({ request, response }: HttpContextContract) {

    const data = request.qs();
    const pdvId = request.header('pdvId')
    var findId: number
    var priceGrafico: number
    var dateGrafico: DateTime
    var grafico: any[] = []


    //--- achar o id ----//
    const findproduct = await Product.query().where('pdv_id', `${pdvId}`).where('name', `${data.name}`)
    findId = findproduct[0].$attributes.id

    const findDate = await Sale.query().where('pdv_id', `${pdvId}`).where('product_id', `${findId}`).whereBetween('created_at', [data.dataInicio, data.dataFim])

    for (let i = 0; i < findDate.length; i++) {
      priceGrafico = await findDate[i].$attributes.value
      dateGrafico = await findDate[i].$attributes.createdAt.toJSDate()
      grafico.push({ dateGrafico, priceGrafico })

    }

    return response.status(200).json(grafico)

  }
}
