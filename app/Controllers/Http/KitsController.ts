import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kit from 'App/Models/Kit';
import KitProduct from 'App/Models/KitProduct';
export default class KitsController {

  public async store({ request, response }: HttpContextContract) {
    try {
      const { kitDescription, price, name, shipping, discount, quantity } = request.only([
        'kitDescription',
        'price',
        'name',
        'shipping',
        'discount',
        'quantity',
      ]);
      const kits = await Kit.create({
        kitDescription,
        price,
        name,
        shipping,
        discount,
        quantity,
      });

      return kits;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async index({response}: HttpContextContract) {
    try {
      const kits = await Kit.all();

      return kits;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const kits = await Kit.find(params.id);
      await kits?.load('product')
      return kits;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findkits = await Kit.find(params.id);
      const dados = request.only([
        'kit_description',
        'price',
        'name',
        'shipping',
        'discount',
        'quantity'
    ]);

      if (findkits) {
        findkits.merge(dados);
        await findkits.save();
      }

    return findkits;
    } catch (error) {
      return response.status(400).json({message: error.message})
    }

  }

  public async destroy({ params, response }: HttpContextContract) {
    const findkits = await Kit.find(params.id);

    if(!findkits)
      return response.status(404);
    await findkits.delete();
  }

  public async kitProduct({ request, response }: HttpContextContract){

    try {
      const { kitId, productId } = request.body()
      const kitProduct = await KitProduct.create({
        kitId,
        productId
      });

      return kitProduct;
  }
    catch (error) {
      return response.status(400).json({message: error.message})
  }

  }
}
