import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import History from 'App/Models/History'
import Sale from 'App/Models/Sale'

export default class HistoriesController {
  
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
    const listHistory = await Sale.query().from('sales').where('pdv_id', `${id}`).preload('product')

    return listHistory
  }

  public async showHistoryByClientId ({ params}: HttpContextContract) {

    const {id} =  params
    const listHistory = await Sale.query().from('sales').where('client_id', `${id}`).preload('product')
     return listHistory
  }

  public async showHistoryByproductId ({ params}: HttpContextContract) {

      const {id} =  params
      const listHistory = await Sale.query().from('sales').where('product_id', `${id}`).preload('product')
       return listHistory
  }
  public async showHistoryBySignaturesId ({ params}: HttpContextContract) {

      const {id} =  params
      const listHistory = await Sale.query().from('sales').where('signatures_id', `${id}`).preload('product')
      return listHistory
  }

  public async showHistoryByKitsId ({ params}: HttpContextContract) {

    const {id} =  params
    const listHistory = await Sale.query().from('sales').where('kit_id', `${id}`).preload('kit')
    return listHistory
}
}
