import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Signature from 'App/Models/Signature';

export default class SignaturesController {
  public async store({ request, auth }: HttpContextContract) {
    const { name, price, duration } = request.only([
      'name',
      'price',
      'duration'
    ]);
    const signature = await Signature.create({
      name,
      price,
      duration,
      pvdId: auth.user?.id
    });

    return signature;
  }

  public async index({}: HttpContextContract) {
    const signature = await Signature.all();

    return signature;
  }

  public async show({ params }: HttpContextContract) {
    const signature = await Signature.find(params.id);
    await signature?.load('pvd')

    return signature;
  }

  public async update({ request, params }: HttpContextContract) {
    const findsignature = await Signature.find(params.id);
    const dados = request.only([
      'name',
      'price',
      'duration'
    ]);

    if (findsignature) {
      findsignature.merge(dados);
      await findsignature.save();
    }

    return findsignature;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findsignature = await Signature.find(params.id);

    if(!findsignature)
      return response.status(404);
    await findsignature.delete();
  }

}
