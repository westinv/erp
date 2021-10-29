import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Pvd from 'App/Models/Pvd'
import Salesman from 'App/Models/Salesman';

export default class PvdsController {

    public async store ({ response,auth,request }: HttpContextContract) {
    if(!(auth.user instanceof Salesman) && !(auth.user instanceof Account))
      return response.status(403);

    const {tradeName,companyName,number,state,cnpj,description,address,city,district,cep,complement,referencePoint } = request.only([
        'tradeName',
        'number',
        'companyName',
        'state',
        'cnpj',
        'description',
        'address',
        'city',
        'district',
        'cep',
        'complement',
        'referencePoint'
    ])
    const pvd = await Pvd.create({
        tradeName,
        companyName,
        state,
        cnpj,
        description,
        number,
        address,
        city,
        district,
        cep,
        complement,
        referencePoint,
        salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user.salesmanId,
        accountId: auth.user instanceof Account ? auth.user.id : undefined
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
            'tradeName',
            'companyName',
            'state',
            'cnpj',
            'description',
            'address',
            'city',
            'district',
            'cep',
            'complement',
            'referencePoint',
            'number'
        ])
        if (findpvd) {
            findpvd.merge(dados)
            await findpvd.save()
          }

          return findpvd

      }

}
