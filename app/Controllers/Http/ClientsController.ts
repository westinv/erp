import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';


export default class ClientsController {

  public async store ({ request }: HttpContextContract) {


    const {name,address,city,state,district,cep,complement,phone } = request.body()
    const client = await Client.create({
        name,
        address,
        city,
        state,
        district,
        cep,
        complement,
        phone,
    })

    return client;
    }

    public async index ({}: HttpContextContract) {
        const client = await Client.all()

        return client
      }

      public async show ({ params }: HttpContextContract) {
        const client = await Client.find(params.id)

        return client
      }

      public async destroy ({ params, response }: HttpContextContract) {
        const findclient = await Client.find(params.id)
        if(!findclient)
          return response.status(404);
        await findclient.delete()
      }
      public async update ({ request, params }: HttpContextContract) {
        const findclient = await Client.find(params.id)
        const dados = request.body()
        if (findclient) {
            findclient.merge(dados)
            await findclient.save()
          }

          return findclient

      }
}
