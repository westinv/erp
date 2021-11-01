import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';


export default class ClientsController {

  public async store ({ request,response }: HttpContextContract) {
     try {
      const {name,address,city,number,state,district,cep,complement,phone,pvdId } = request.body()
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
          pvdId
      })
      return client;
     } catch (error) {
      return response.status(400).json({message: error.message})
     }
    }

    public async index ({response}: HttpContextContract) {
      try {
        const client = await Client.all()
        return client
      } catch (error) {
        return response.status(400).json({message: error.message})
      }
      }

      public async show ({ params, response }: HttpContextContract) {
        try {
          const client = await Client.find(params.id)
          return client
        } catch (error) {
          return response.status(400).json({message: error.message})
        }
      }

      public async destroy ({ params, response }: HttpContextContract) {
        const findclient = await Client.find(params.id)
        if(!findclient)
          return response.status(404);
        await findclient.delete()
      }
      public async update ({ request, params, response }: HttpContextContract) {
        try {
          const findclient = await Client.find(params.id)
          const dados = request.body()
          if (findclient) {
              findclient.merge(dados)
              await findclient.save()
            }

            return findclient
        } catch (error) {
          return response.status(400).json({message: error.message})
        }
      }
}
