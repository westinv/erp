import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Pvd from 'App/Models/Pvd'
import Salesman from 'App/Models/Salesman';

export default class PvdsController {

    public async store ({ response,auth,request }: HttpContextContract) {
    if(!(auth.user instanceof Salesman) && !(auth.user instanceof Account))
      return response.status(403);


    const {name,cnpj,description,address,city,district,cep,complement,reference_point } = request.only([
        'name',
        'cnpj',
        'description',
        'address',
        'city',
        'district',
        'cep',
        'complement',
        'reference_point'
    ])
    const pvd = await Pvd.create({
        name,
        cnpj,
        description,
        address,
        city,
        district,
        cep,
        complement,
        reference_point,
    })

    return pvd;
    }

    public async index ({}: HttpContextContract) {
        const pvd = await Pvd.all()

        return pvd
      }

      public async show ({ params }: HttpContextContract) {
        const pvd = await Pvd.find(params.id)

        return pvd
      }

      public async destroy ({ params, response }: HttpContextContract) {
        const findpvd = await Pvd.find(params.id)
        if(!findpvd)
          return response.status(404);
        await findpvd.delete()
      }
      public async update ({ request, params }: HttpContextContract) {
        const findpvd = await Pvd.find(params.id)
        const dados = request.only([
            'name',
            'cnpj',
            'description',
            'address',
            'city',
            'district',
            'cep',
            'complement',
            'reference_point'
        ])
        if (findpvd) {
            findpvd.merge(dados)
            await findpvd.save()
          }

          return findpvd

      }

}
