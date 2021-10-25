import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Salesman from 'App/Models/Salesman';

export default class SalesmenController {
  public async store({ request }: HttpContextContract) {
    const {
      name, cpf, cnpj, address, city, district, email, phone, username, password,
    } = request.only(['name', 'email', 'cpf','cnpj', 'address', 'city', 'district', 'phone', 'username', 'password']);
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
    });

    return salesmen;
  }

  public async index({}: HttpContextContract) {
    const salesmen = await Salesman.all();

    return salesmen;
  }

  public async show({ params }: HttpContextContract) {
    const salesmen = await Salesman.find(params.id)
    await salesmen?.load('accounts')
    return salesmen
  }

  public async update({ request, params }: HttpContextContract) {
    const findSalesman = await Salesman.find(params.id);
    const dados = request.only(['name', 'email', 'cpf_cnpj', 'address', 'city', 'district', 'phone', 'username', 'password']);

    if (findSalesman) {
      findSalesman.merge(dados);
      await findSalesman.save();
    }

    return findSalesman;
  }

  public async destroy({ params,  response }: HttpContextContract) {
    const findSalesman = await Salesman.find(params.id);
    if(!findSalesman)
      return response.status(404);
    await findSalesman.delete();
  }
}
