 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PhoneNumber from 'App/Models/PhoneNumber'

export default class PhoneNumbersController {
    public async store ({ request, auth }: HttpContextContract) {
        const {phoneNumber } = request.only([
          'phoneNumber'
        ])
        const number = await PhoneNumber.create({
         phoneNumber,
         pvdId: auth.user?.id

        })

        return number
      }

      public async index ({}: HttpContextContract) {
        const number = await PhoneNumber.all()

        return number
      }

      public async show ({ params }: HttpContextContract) {
        const number = await PhoneNumber.find(params.id)
        await number?.load('pvd')
        return number
      }

      public async update ({ request, params }: HttpContextContract) {
        const findnumber = await PhoneNumber.find(params.id)
        const dados = request.only(['phoneNumber'])

        if (findnumber) {
          findnumber.merge(dados)
          await findnumber.save()
        }

        return findnumber
      }

      public async destroy ({ params,  response }: HttpContextContract) {
        const findnumber = await PhoneNumber.find(params.id)
        if(!findnumber)
          return response.status(404);
        await findnumber.delete()
      }
}
