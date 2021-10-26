import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignatureClient from 'App/Models/SignatureClient';

export default class SignatureClientsController {
  public async store({ request }: HttpContextContract) {
    const { signature_date,active_subscription,due_date } = request.only([
      'signature_date',
      'active_subscription',
      'due_date'
    ]);
    const clients = await SignatureClient.create({
      signature_date,
      active_subscription,
      due_date
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
      'signature_date',
      'active_subscription',
      'due_date'
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
