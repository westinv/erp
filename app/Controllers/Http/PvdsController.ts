import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Pvd from 'App/Models/Pdv';
import Salesman from 'App/Models/Salesman';


export default class PdvsController {

  public async store({ response, auth, request }: HttpContextContract) {

    try {
      if (!(auth.user instanceof Salesman) && !(auth.user instanceof Account))
        return response.status(403);

      const { tradeName, companyName, number, state, cnpj, description, address, city, district, cep, complement, landmark } = request.body()
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
        landmark,
        salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user.salesmanId,
        accountId: auth.user instanceof Account ? auth.user.id : undefined
      })
      return pdv;

    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const pdv = await Pvd.all()
      return pdv
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const pdv = await Pvd.find(params.id)
      return pdv
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findPdv = await Pvd.find(params.id)
    if (!findPdv)
      return response.status(404);
    await findPdv.delete()
  }
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findPdv = await Pvd.find(params.id)
      const dados = request.body()
      if (findPdv) {
        findPdv.merge(dados)
        await findPdv.save()
      }
      return findPdv
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

  }
  public async showlistclient({ auth, response }: HttpContextContract) {
    if (auth.user instanceof Salesman) {
      const pdv = await Pvd.query().where('salesman_id', auth.user.id)
      return pdv
    } else if (auth.user instanceof Account) {
      const pdv = await Pvd.query().where('account_id', auth.user.id)
      return pdv
    }
  }
}
