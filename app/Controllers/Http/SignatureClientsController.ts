import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Client from 'App/Models/Client';
import Salesman from 'App/Models/Salesman';
import SignatureClient from 'App/Models/SignatureClient';

export default class SignatureClientsController {
  public async store({ request, response, auth }: HttpContextContract) {

    try {

      const { signatureDate, activeSubscription, dueDate, clientCode, clientId, signatureId } = request.body()
      const clients = await SignatureClient.create({
        signatureDate,
        activeSubscription,
        dueDate,
        clientId,
        signatureId,
        clientCode,
        accountId: auth.user instanceof Account ? auth.user.id : undefined,
        salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user?.salesmanId,
      });
      return clients;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const clients = await SignatureClient.all();
      return clients;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const clients = await SignatureClient.find(params.id);
      return clients;
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findclients = await SignatureClient.find(params.id);
      const dados = request.body()

      if (findclients) {
        findclients.merge(dados);
        await findclients.save();
      }

      return findclients;

    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findclients = await SignatureClient.find(params.id);

    if (!findclients)
      return response.status(404);
    await findclients.delete();
  }

  public async indexByclientId({ params }: HttpContextContract) {
    const { id } = params
    const historicoAssinatura = await SignatureClient.query().where('client_id', `${id}`).preload('signature')
    const cliente = await Client.query().select('*').where('id', `${id}`)

    return { historicoAssinatura, cliente }
  }

  public async indexByActive({ auth }: HttpContextContract) {

    if (auth.user instanceof Salesman) {
      const pdv = await SignatureClient.query().where('salesman_id', auth.user.id).andWhere('active_subscription', true).preload('client')
      return pdv
    } else if (auth.user instanceof Account) {
      const pdv = await SignatureClient.query().where('account_id', auth.user.id).andWhere('active_subscription', true).preload('client')
      return pdv
    }
  }

}
