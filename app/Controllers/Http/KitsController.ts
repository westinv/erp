import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account';
import Kit from 'App/Models/Kit';
import KitProduct from 'App/Models/KitProduct';
import Salesman from 'App/Models/Salesman';


interface IProducts {
  productId?: number[],
}

export default class KitsController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { description, price, name, shipping, discount, quantity } = request.body();
      const kits = await Kit.create({
        description,
        price,
        name,
        shipping,
        discount,
        quantity,
        accountId: auth.user instanceof Account ? auth.user.id : undefined,
        salesmanId: auth.user instanceof Salesman ? auth.user.id : auth.user?.salesmanId,
      });

      return kits;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const kits = await Kit.all()
      return kits;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const findkits = await Kit.find(params.id);
      const dados = request.body()

      if (findkits) {
        findkits.merge(dados);
        await findkits.save();
      }

      return findkits;
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const findkits = await Kit.find(params.id);

    if (!findkits)
      return response.status(404);
    await findkits.delete();
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const kits = await Kit.find(params.id)

      await kits?.load('kitProduct', loader => loader.preload('product'))
      return kits
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async kitProduct({ request, response }: HttpContextContract) {
    try {
      const kitId = request.header('kitId')
      const { productId }: IProducts = request.body()
      if (!productId) {
        return response.status(400).json({ message: 'Id do kit incorreto ou inexistente!' })
      }
      const returnProduct = productId.map(async (productId) => {
        const kitProduct = await KitProduct.create({
          kitId,
          productId,
        });
        return kitProduct
      })
      return returnProduct
    }
    catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
  public async kitProductDelete({ params, response }: HttpContextContract) {
    try {
      const findkitProduct = await KitProduct.find(params.id)
      if (!findkitProduct)
        return response.status(404)
      await findkitProduct.delete()
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async kitProductUpdate({ params, response, request }: HttpContextContract) {
    try {
      const findkitProduct = await Kit.query().where('id', params.id).preload('kitProduct')
      const { productId } = request.body()
      const find = findkitProduct[0].$preloaded.kitProduct
      if (Array.isArray(find)) {
        for (let i = 0; i < find.length; i++) {
          const findProducts = find[i].$attributes.productId
          const updateProductId = productId[i]
          await KitProduct.query().from('kit_products').where('product_id', findProducts).update({ productId: updateProductId })
        }
      }
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async kitProductDeleteProduct({ params, response, request }: HttpContextContract) {
    try {
      const { productsId } = request.body();
      const findkitProduct = await KitProduct.query().where('kit_id', params.id).whereIn('product_id', productsId).delete()

      return findkitProduct
    }
    catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }


  public async FindProducts({ params }: HttpContextContract) {
    const { id } = params
    const listHistory = await KitProduct.query().from('kit_products').where('kit_id', `${id}`).preload('product')
    return listHistory
  }

  public async showlistkits({ auth }: HttpContextContract) {
    if (auth.user instanceof Salesman) {
      const pdv = await Kit.query().where('salesman_id', auth.user.id)
      return pdv
    } else if (auth.user instanceof Account) {
      const pdv = await Kit.query().where('account_id', auth.user.id)
      return pdv
    }
  }
}
