import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Salesman from 'App/Models/Salesman';

export default class SalesmenController {
  public async store({ request, response }: HttpContextContract) {

    try {
      const {
        name, number, cpf, cnpj, address, city, complements, district, email, phone, username, password,
      } = request.body()
      const salesmen = await Salesman.create({
        name,
        email,
        cpf,
        cnpj,
        address,
        city,
        district,
        phone,
        username,
        password,
        complements,
        number

      });

      return salesmen;

    } catch (error) {
      return response.status(400).json({ message: error.message })

    }

  }

  public async index({ response }: HttpContextContract) {

    try {
      const salesmen = await Salesman.all();

      return salesmen;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const salesmen = await Salesman.find(params.id)
      await salesmen?.load('accounts')
      return salesmen
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    try {
      const findSalesman = await Salesman.find(params.id);
      const dados = request.body();

      if (findSalesman) {
        findSalesman.merge(dados);
        await findSalesman.save();
        return findSalesman;
      }
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findSalesman = await Salesman.find(params.id);
    if (!findSalesman)
      return response.status(404);
    await findSalesman.delete();
  }

}
