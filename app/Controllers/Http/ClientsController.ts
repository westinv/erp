import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';
import Pvd from 'App/Models/Pvd';

export default class ClientsController {

  public async store ({auth, request, response }: HttpContextContract) {

    if(!(auth.user instanceof Pvd))
      return  response.status(403)

    const {name,address,city,state,district,cep,complement,phone } = request.only([
        'name',
        'address',
        'state',
        'city',
        'district',
        'cep',
        'complement',
        'phone'
    ])
    const client = await Client.create({
        name,
        address,
        city,
        state,
        district,
        cep,
        complement,
        phone,
        pvdId: auth.user.id
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
        const dados = request.only([
            'name',
            'address',
            'city',
            'district',
            'cep',
            'state',
            'complement',
            "phone"
        ])
        if (findclient) {
            findclient.merge(dados)
            await findclient.save()
          }

          return findclient

      }
}
