import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import FixedExpense from "App/Models/FixedExpense";

export default class FixedExpensesController {

  public async store({ request, response }: HttpContextContract) {

    try {
      const { description, price, pdvId, name, bank, transactionType } = request.body()
      const expenses = await FixedExpense.create({
        description,
        price,
        pdvId,
        name,
        bank,
        transactionType
      });
      return expenses;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const expenses = await FixedExpense.all();
      return expenses;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const expenses = await FixedExpense.find(params.id);
      return expenses;
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findExpenses = await FixedExpense.find(params.id);
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
    const findExpenses = await FixedExpense.find(params.id);

    if (!findExpenses)
      return response.status(404);
    await findExpenses.delete();
  }

  public async showExpensesByPdvId({ params }: HttpContextContract) {
    const { id } = params
    const listHistory = await FixedExpense.query().where('pdv_id', `${id}`).preload('pdv')
    return listHistory
  }


}
