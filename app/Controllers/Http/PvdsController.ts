import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pvd from 'App/Models/Pvd'

export default class PvdsController {

    public async store ({ request }: HttpContextContract) {
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
        reference_point 
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
