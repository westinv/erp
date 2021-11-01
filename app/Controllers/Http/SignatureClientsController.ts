import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignatureClient from 'App/Models/SignatureClient';

export default class SignatureClientsController {
  public async store({request, response }: HttpContextContract) {

    try {
      const { signatureDate,activeSubscription,dueDate } = request.only([
        'signatureDate',
        'activeSubscription',
        'dueDate'
      ]);
      const clients = await SignatureClient.create({
        signatureDate,
        activeSubscription,
        dueDate,
      });

      return clients;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async index({response}: HttpContextContract) {
    try {
      const clients = await SignatureClient.all();
      return clients;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const clients = await SignatureClient.find(params.id);
      return clients;
    } catch (error) {
      return response.status(404).json({message: error.message})
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
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

    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findclients = await SignatureClient.find(params.id);

    if(!findclients)
      return response.status(404);
    await findclients.delete();
  }

}
