
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({ auth, request, response }: HttpContextContract) {

    const { username,email, password } = request.body()

    try {

      if(!email){
        const token = await auth.use('api').attempt(username, password)
        return token
      }else{
        const token = await auth.use('api').attempt(email, password)
        return token
      }
    } catch {
      return response.status(401).badRequest('Invalid credentials')
    }
  }

  public async loginAccount ({ auth, request, response }: HttpContextContract) {

    const { email, password } = request.body()

    try {
      const token = await auth.use('apiAccount').attempt(email, password)
      return token
    } catch(e) {
      console.log(e)
      return response.status(401).badRequest('Invalid credentials!')
    }
  }
}
