import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Pvd from 'App/Models/Pdv';
import Salesman from 'App/Models/Salesman';

export default class PdvsController {

    public async store ({ response,auth,request }: HttpContextContract) {

      try {
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
    const pdv = await Pvd.create({
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
    return pdv;

      } catch (error) {
        return response.status(400).json({message: error.message})
      }

    }

    public async index ({response}: HttpContextContract) {
        try {
          const pdv = await Pvd.all()
          return pdv
        } catch (error) {
          return response.status(400).json({message: error.message})
        }
      }

      public async show ({ params, response }: HttpContextContract) {
        try {
          const pdv = await Pvd.find(params.id)
          return pdv
        } catch (error) {
          return response.status(400).json({message: error.message})
        }
      }

      public async destroy ({ params, response }: HttpContextContract) {
        const findPdv = await Pvd.find(params.id)
        if(!findPdv)
          return response.status(404);
        await findPdv.delete()
      }
      public async update ({ request, params, response }: HttpContextContract) {
        try {
          const findPdv = await Pvd.find(params.id)
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
        if (findPdv) {
            findPdv.merge(dados)
            await findPdv.save()
          }
        return findPdv
        } catch (error) {
          return response.status(400).json({message: error.message})
        }

      }

}
