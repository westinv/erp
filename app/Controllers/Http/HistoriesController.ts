import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import History from 'App/Models/History'

export default class HistoriesController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      const clientId = request.header('client_id')
      const productId = request.header('productId')
      const signatureId = request.header('signatureId')
      const pvdId = request.header('pvdId')
      const {payment } = request.only([
        'payment'
      ])
      const number = await History.create({
       payment,
       clientId,
       productId,
       signatureId,
       pvdId,
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

  public async showHistoryByPdvId ({ params}: HttpContextContract) {
    const {id} =  params
    const listHistory = await Database
    .from('histories')
    .where('pvds_id', `${id}`)

    return listHistory
  }

  public async showHistoryByClientId ({ params}: HttpContextContract) {

    const {id} =  params

    const listHistory = await Database
    .from('histories')
    .where('client_id', `${id}`)

     return listHistory
  }

  public async showHistoryByproductId ({ params}: HttpContextContract) {

      const {id} =  params

      const listHistory = await Database
      .from('histories')
      .where('product_id', `${id}`)

       return listHistory
  }
  public async showHistoryBySignaturesId ({ params}: HttpContextContract) {

      const {id} =  params

      const listHistory = await Database
      .from('histories')
      .where('signatures_id', `${id}`)

      return listHistory
  }

}
