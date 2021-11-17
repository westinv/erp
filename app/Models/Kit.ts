import { DateTime } from 'luxon'
import { BaseModel,column, hasMany, HasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import KitProduct from './KitProduct'

export default class Kit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kitDescription: string

  @column()
  public name: string

  @column()
  public quantity: number

  @column()
  public price: number

  @column()
  public discount: number

  @column()
  public shipping: number

  @manyToMany(() => Product)
  public product: ManyToMany<typeof Product>

  @hasMany(()=>KitProduct )
  public kitProduct: HasMany<typeof KitProduct>




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
