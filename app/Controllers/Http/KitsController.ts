import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kit from 'App/Models/Kit';
import KitProduct from 'App/Models/KitProduct';


interface IProducts{
  productsId?: number[],
  availableQuantity?: number
}

export default class KitsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const { description, price, name, shipping, discount, quantity } = request.body();
      const kits = await Kit.create({
        description,
        price,
        name,
        shipping,
        discount,
        quantity
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

  public async show({ params, response }: HttpContextContract) {
    try {
      const kits = await Kit.find(params.id)

      await kits?.load('kitProduct', loader => loader.preload('product'))
      return kits
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async kitProduct({ request, response }: HttpContextContract){
    try {
      const kitId = request.header('kitId')
      const { productsId, availableQuantity }: IProducts = request.body()
      if(!productsId ){
        return response.status(400).json({message: 'Passou errado!'})
      }
      const returnProduct = productsId.map( async (productId)=> {
        const kitProduct = await KitProduct.create({
          kitId,
          productId,
          availableQuantity
        });
        return kitProduct
      })
      return returnProduct
    }
    catch (error) {
      return response.status(400).json({message: error.message})
    }
  }
  public async kitProductDelete({ params, response }: HttpContextContract){
    try {
      const findkitProduct = await KitProduct.find(params.id)
        if(!findkitProduct)
          return response.status(404)
          await findkitProduct.delete()
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }
}
