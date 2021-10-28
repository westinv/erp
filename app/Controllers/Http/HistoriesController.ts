import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import History from "App/Models/History"

export default class HistoriesController {
  public async store ({ request, auth }: HttpContextContract) {
    const {payment } = request.only([
      'payment'
    ])
    const number = await History.create({
     payment,
     clientId: auth.user?.id

    })

    return number
  }

  public async index ({}: HttpContextContract) {
    const number = await History.all()

    return number
  }

  public async show ({ params }: HttpContextContract) {
    const number = await History.find(params.id)
    await number?.load('history')
    return number
  }

  public async update ({ request, params }: HttpContextContract) {
    const findnumber = await History.find(params.id)
    const dados = request.only(['payment'])

    if (findnumber) {
      findnumber.merge(dados)
      await findnumber.save()
    }

    return findnumber
  }

  public async destroy ({ params,  response }: HttpContextContract) {
    const findnumber = await History.find(params.id)
    if(!findnumber)
      return response.status(404);
    await findnumber.delete()
  }
}
