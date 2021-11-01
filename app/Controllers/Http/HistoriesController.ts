import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import History from 'App/Models/History'

export default class HistoriesController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      const {payment } = request.only([
        'payment'
      ])
      const number = await History.create({
       payment,
      })
      return number
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async index ({response}: HttpContextContract) {
    try {
    const number = await History.all()
    return number
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async show ({ params, response }: HttpContextContract) {
    try {
    const number = await History.find(params.id)
    await number?.load('history')
    return number
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async update ({ request, params, response }: HttpContextContract) {
    try {
    const findnumber = await History.find(params.id)
    const dados = request.only(['payment'])

    if (findnumber) {
      findnumber.merge(dados)
      await findnumber.save()
    }

    return findnumber
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async destroy ({ params,  response }: HttpContextContract) {
    const findnumber = await History.find(params.id)
    if(!findnumber)
      return response.status(404);
    await findnumber.delete()
  }
}
