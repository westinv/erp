 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PhoneNumber from 'App/Models/PhoneNumber'

export default class PhoneNumbersController {
    public async store ({ request, auth, response }: HttpContextContract) {

      try {
        const {phoneNumber } = request.only([
          'phoneNumber'
        ])
        const number = await PhoneNumber.create({
         phoneNumber,
         pvdId: auth.user?.id

        })
        return number
      } catch (error) {
        return response.status(400).json({message: error.message})
      }

      }

      public async index ({response}: HttpContextContract) {
        try {
          const number = await PhoneNumber.all()
          return number
        } catch (error) {
          return response.status(400).json({message: error.message})
        }

      }

      public async show ({ params, response }: HttpContextContract) {
        try {
          const number = await PhoneNumber.find(params.id)
        await number?.load('pvd')
        return number
        } catch (error) {
          return response.status(400).json({message: error.message})
        }

      }

      public async update ({ request, params, response }: HttpContextContract) {
        try {
          const findnumber = await PhoneNumber.find(params.id)
          const dados = request.only(['phoneNumber'])

          if (findnumber) {
            findnumber.merge(dados)
            await findnumber.save()
          }
          return findnumber
        } catch (error) {
          return response.status(400).json({message: error.message})
        }

      }

      public async destroy ({ params,  response }: HttpContextContract) {
        const findnumber = await PhoneNumber.find(params.id)
        if(!findnumber)
          return response.status(404);
        await findnumber.delete()
      }
}
