import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';
import Salesman from 'App/Models/Salesman';


export default class AccountsController {
  public async store({ response,request, auth }: HttpContextContract) {
    if(!(auth.user instanceof Salesman))
      return  response.status(403)

    const { email, password, username } = request.only([
      'email',
      'password',
      'username',
    ]);
    const account = await Account.create({
      email,
      password,
      username,
      salesmanId: auth.user.id

    });

    return account;
  }

  public async index({}: HttpContextContract) {
    const account = await Account.all()

    return account;
  }

  public async show({ params }: HttpContextContract) {
    const account = await Account.find(params.id);
    await account?.load('salesman')
    return account;
  }

  public async update({ request, params }: HttpContextContract) {
    const findAccount = await Account.find(params.id);
    const dados = request.only([
      'email',
      'password',
      'username',
    ]);

    if (findAccount) {
      findAccount.merge(dados);
      await findAccount.save();
    }

    return findAccount;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findAccount = await Account.find(params.id);

    if(!findAccount)
      return response.status(404);
    await findAccount.delete();
  }
}
