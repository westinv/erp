import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/* import Client from 'App/Models/Client';
import History from 'App/Models/History';
import Signature from 'App/Models/Signature'; */
import SignatureClient from 'App/Models/SignatureClient';

export default class SignatureClientsController {
  public async store({request }: HttpContextContract) {
    /* if(!(auth.user instanceof Client) && !(auth.user instanceof Signature))
      return response.status(403); */

    const { signatureDate,activeSubscription,dueDate } = request.only([
      'signatureDate',
      'activeSubscription',
      'dueDate'
    ]);
    const clients = await SignatureClient.create({
      signatureDate,
      activeSubscription,
      dueDate,
      /* clientId: auth.user instanceof Client ? auth.user.id : undefined,
      signatureId: auth.user instanceof Signature ? auth.user.id : undefined,
      historyId: auth.user instanceof History ? auth.user.id : undefined */
    });

    return clients;
  }

  public async index({}: HttpContextContract) {
    const clients = await SignatureClient.all();

    return clients;
  }

  public async show({ params }: HttpContextContract) {
    const clients = await SignatureClient.find(params.id);

    return clients;
  }

  public async update({ request, params }: HttpContextContract) {
    const findclients = await SignatureClient.find(params.id);
    const dados = request.only([
      'signatureDate',
      'activeSubscription',
      'dueDate'
    ]);

    if (findclients) {
      findclients.merge(dados);
      await findclients.save();
    }

    return findclients;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findclients = await SignatureClient.find(params.id);

    if(!findclients)
      return response.status(404);
    await findclients.delete();
  }

}
