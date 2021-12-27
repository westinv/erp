import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Signature from 'App/Models/Signature';
import SignatureCreate from 'App/Models/SignatureCreate';

interface Iids {
  productsId?: number[],
  signatureId?: string

}

export default class SignaturesController {

  public async store({ request, response }: HttpContextContract) {

    try {
      const { name, price, shipping, pdvId, note, discount, clientCode } = request.body()
      const signature = await Signature.create({
        name,
        price,
        pdvId,
        note,
        shipping,
        discount,
        clientCode
      });

      return signature;

    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

  }

  public async index({ response }: HttpContextContract) {

    try {
      const signature = await Signature.all();
      return signature;

    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {

    try {
      const signature = await Signature.find(params.id);
      await signature?.load('signatureIds', loader => loader.preload('product'))
      return signature;

    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findsignature = await Signature.find(params.id);
      const dados = request.body()

      if (findsignature) {
        findsignature.merge(dados);
        await findsignature.save();
      }

      return findsignature;
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findsignature = await Signature.find(params.id);

    if (!findsignature)
      return response.status(404);
    await findsignature.delete();
  }

  public async sigantureIds({ request, response }: HttpContextContract) {
    try {
      const { productsId, signatureId }: Iids = request.body()
      if (!productsId) {
        return response.status(400).json({ message: 'Passou errado!' })
      }
      const returnids = productsId.map(async (productId) => {
        const todosIds = await SignatureCreate.create({
          productId,
          signatureId
        });
        return todosIds
      })
      return returnids
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }
  }

  public async signatureDeleteProduct({ params, response }: HttpContextContract) {

    try {
      const findassing = await SignatureCreate.find(params.id)
      if (!findassing)
        return response.status(404)
      await findassing.delete()
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }


  public async signatureUpdateProdructs({ params, request, response }: HttpContextContract) {
    try {
      const findSignatureProduct = await Signature.query().where('id', params.id).preload('signatureIds')
      const { productId } = request.body()

      const find = findSignatureProduct[0].$preloaded.signatureIds

      if (Array.isArray(find)) {
        for (let i = 0; i < find.length; i++) {
          const findProducts = find[i].$attributes.productId
          const updateProductId = productId[i]
          await SignatureCreate.query().from('signature_creates').where('product_id', findProducts).update({ productId: updateProductId })
        }
      }
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

}
