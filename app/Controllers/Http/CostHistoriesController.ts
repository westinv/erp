import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import FixedExpense from 'App/Models/FixedExpense';

export default class CostHistoriesController {

  public async index({response}: HttpContextContract) {
    try {
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }
  public async show({ response }: HttpContextContract) {
    try {
      /* //const cost = await Cost.query().from('costs').where('id', params.id)
      return cost */
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }
  public async showCostByPdvId({ response }: HttpContextContract) {
    try {
    /* const {id} =  params
    const listHistory = await Cost.query().from('costs').where('pdv_id', `${id}`)
    return listHistory */
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }
  public async showFixedRxpensesByPdvId({ params, response }: HttpContextContract) {
    try {
    const {id} =  params
    const listHistory = await FixedExpense.query().from('fixed_expenses').where('pdv_id', `${id}`)
    return listHistory
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }
}
