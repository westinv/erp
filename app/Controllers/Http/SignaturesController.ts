import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import Pvd from 'App/Models/Pvd';
import Signature from 'App/Models/Signature';

export default class SignaturesController {

  public async store({ request, auth, response }: HttpContextContract) {

    try {
      const { name, price, duration } = request.only([
        'name',
        'price',
        'duration'
      ]);
      const signature = await Signature.create({
        name,
        price,
        duration,
        pvdId: auth.user instanceof Pvd ? auth.user.id : undefined,
        productId: auth.user instanceof Product ? auth.user.id : undefined,

      });

      return signature;

    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async index({response}: HttpContextContract) {

    try {
      const signature = await Signature.all();
      return signature;

    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async show({ params, response }: HttpContextContract) {

    try {
      const signature = await Signature.find(params.id);
      await signature?.load('pvd')
      return signature;

    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
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
    } catch (error) {
      return response.status(404).json({message: error.message})
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findsignature = await Signature.find(params.id);

    if(!findsignature)
      return response.status(404);
    await findsignature.delete();
  }

}
