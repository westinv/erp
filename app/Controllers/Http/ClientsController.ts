import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Client from 'App/Models/Client';
import Salesman from 'App/Models/Salesman';


export default class ClientsController {

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      if (!(auth.user instanceof Salesman) && !(auth.user instanceof Account))
        return response.status(403);

      const { name, address, city, number, state, district, cep, complement, phone, pdvId, clientCode } = request.body()
      const client = await Client.create({
        name,
        address,
        city,
        state,
        district,
        cep,
        complement,
        phone,
        number,
        pdvId,
        clientCode,
        accountId: auth.user instanceof Account ? auth.user.id : undefined,
        salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user.salesmanId,
      })
      return client;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const client = await Client.all()
      return client
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const client = await Client.find(params.id)
      return client
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findclient = await Client.find(params.id)
    if (!findclient)
      return response.status(404);
    await findclient.delete()
  }
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findclient = await Client.find(params.id)
      const dados = request.body()
      if (findclient) {
        findclient.merge(dados)
        await findclient.save()
      }

      return findclient
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async indexByPdvId({ response, request }: HttpContextContract) {
    const pdvId = request.header('pdvId')

    if (!pdvId) {
      return response.status(400).json({ message: "Esqueceu de passar" })
    }
    try {
      const client = await Client.query().where('pdvId', pdvId)
      return client
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async indexByClientCode({ response, request }: HttpContextContract) {
    const clientCode = request.header('clientCode')

    if (!clientCode) {
      return response.status(400).json({ message: "Esqueceu de passar" })
    }
    try {
      const client = await Client.query().where('clientCode', clientCode)
      return client
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async showlistclient({ auth }: HttpContextContract) {
    if (auth.user instanceof Salesman) {
      const pdv = await Client.query().where('salesman_id', auth.user.id)
      return pdv
    } else if (auth.user instanceof Account) {
      const pdv = await Client.query().where('account_id', auth.user.id)
      return pdv
    }
  }
}
