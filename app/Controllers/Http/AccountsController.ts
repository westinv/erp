import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';
import Salesman from 'App/Models/Salesman';


export default class AccountsController {
  public async store({ response,request, auth }: HttpContextContract) {
    try {
      if(!(auth.user instanceof Salesman))
      return  response.status(403)

    const { email,name , password, username } = request.body();
    const account = await Account.create({
      email,
      password,
      name,
      username,
      salesmanId: auth.user.id

    });

    return account;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async index({response}: HttpContextContract) {
    try {
      const account = await Account.all()
      return account;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const account = await Account.find(params.id);
      await account?.load('salesman')
      return account;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
    const findAccount = await Account.find(params.id);
    const dados = request.only([
      'email',
      'password',
      'username',
      'name'
    ]);

    if (findAccount) {
      findAccount.merge(dados);
      await findAccount.save();
    }

    return findAccount;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findAccount = await Account.find(params.id);

    if(!findAccount)
      return response.status(404);
    await findAccount.delete();
  }
}
