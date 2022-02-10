import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Release from 'App/Models/Release';
import Salesman from 'App/Models/Salesman';
import { DateTime } from 'luxon';

export default class ReleasesController {

  public async store({ request, response, auth }: HttpContextContract) {

    try {
      const { description, price, pdvId, name, bank, transactionType } = request.body()
      const expenses = await Release.create({
        description,
        price,
        pdvId,
        name,
        bank,
        transactionType,
        accountId: auth.user instanceof Account ? auth.user.id : undefined,
        salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user?.salesmanId
      });
      return expenses;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const expenses = await Release.all();
      return expenses;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const expenses = await Release.find(params.id);
      return expenses;
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findExpenses = await Release.find(params.id);
      const dados = request.body()

      if (findExpenses) {
        findExpenses.merge(dados);
        await findExpenses.save();
      }

      return findExpenses;

    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findExpenses = await Release.find(params.id);

    if (!findExpenses)
      return response.status(404);
    await findExpenses.delete();
  }

  public async showReleasesByPdvId({ params }: HttpContextContract) {
    const { id } = params
    const listHistory = await Release.query().where('pdv_id', `${id}`).preload('pdv')
    return listHistory
  }

  public async showlistReleases({ auth }: HttpContextContract) {
    if (auth.user instanceof Salesman) {
      const pdv = await Release.query().where('salesman_id', auth.user.id)
      return pdv
    } else if (auth.user instanceof Account) {
      const pdv = await Release.query().where('account_id', auth.user.id)
      return pdv
    }
  }

  public async releasesChart({ request, response }: HttpContextContract) {
    const data = request.qs();
    const pdvId = request.header('pdvId')

    const findDate = await Release.query().where('pdv_id', `${pdvId}`).whereBetween('created_at', [data.dataInicio, data.dataFim])


    var priceGrafico: number
    var dateGrafico: DateTime
    var grafico: any[] = []

    for (let i = 0; i < findDate.length; i++) {
      priceGrafico = await findDate[i].$attributes.price
      dateGrafico = await findDate[i].$attributes.createdAt.toJSDate()
      grafico.push({ dateGrafico, priceGrafico })
    }


    return response.status(200).json(grafico)

  }
}
