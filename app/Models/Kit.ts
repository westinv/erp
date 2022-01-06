import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import KitProduct from './KitProduct'
import Salesman from './Salesman'
import Account from './Account'

export default class Kit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => KitProduct)
  public kitProduct: HasMany<typeof KitProduct>

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Salesman)
  public salesman: BelongsTo<typeof Salesman>

  @column()
  public accountId: number

  @column()
  public salesmanId: number

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

  @column()
  public saleId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
