import { DateTime } from 'luxon'
import { BaseModel,column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import KitProduct from './KitProduct'

export default class Kit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

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

  @hasMany(()=>KitProduct )
  public kitProduct: HasMany<typeof KitProduct>




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
