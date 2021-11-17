import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pdv from './Pdv'
import Product from './Product'
import Client from './Client'
import Kit from './Kit'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo (()=> Pdv)
  public pdv: BelongsTo<typeof Pdv>

  @hasMany(() => Product)
  public product: HasMany<typeof Product>

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Kit)
  public kit: BelongsTo<typeof Kit>


  @column()
  public pdvsId: string

  @column()
  public clientId: string

  @column()
  public kitsId: string

  @column()
  public productId: string




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
