import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Salesman from 'App/Models/Salesman';
import SignatureClient from 'App/Models/SignatureClient';

export default class SignatureClientsController {
  public async store({ request, response, auth }: HttpContextContract) {

    try {
      const clientId = request.header('clientId')
      const { signatureDate, activeSubscription, dueDate } = request.body()
      const clients = await SignatureClient.create({
        signatureDate,
        activeSubscription,
        dueDate,
        clientId,
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

  public async indexByclientId({ response, request }: HttpContextContract) {
    const clientId = request.header('clientId')

    if (!clientId) {
      return response.status(400).json({ message: "Esqueceu de passar" })
    }

    try {
      const clients = await SignatureClient.all();
      return clients;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}
