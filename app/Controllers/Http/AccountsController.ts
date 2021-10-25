import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Account from 'App/Models/Account';


export default class AccountsController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password, username } = request.only([
      'email',
      'password',
      'username',
    ]);
    const account = await Account.create({
      email,
      password,
      username,
      salesmanId: auth.user?.id
    });

    return account;
  }

  public async index({}: HttpContextContract) {
    const account = await Account.all();
    
    return account;
  }

  public async show({ params }: HttpContextContract) {
    const account = await Account.find(params.id);
    await account?.load('salesmen')
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
