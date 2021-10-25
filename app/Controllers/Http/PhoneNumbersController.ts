 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PhoneNumber from 'App/Models/PhoneNumber'

export default class PhoneNumbersController {
    public async store ({ request }: HttpContextContract) {
        const {phonenumber } = request.only([
          'phonenumber'
        ])
        const number = await PhoneNumber.create({
         phonenumber
        })
    
        return number
      }
    
      public async index ({}: HttpContextContract) {
        const number = await PhoneNumber.all()
    
        return number
      }
    
      public async show ({ params }: HttpContextContract) {
        const number = await PhoneNumber.find(params.id)
    
        return number
      }
    
      public async update ({ request, params }: HttpContextContract) {
        const findnumber = await PhoneNumber.find(params.id)
        const dados = request.only(['phonenumber'])
    
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
