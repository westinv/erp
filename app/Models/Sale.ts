import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pdv from './Pdv'
import Product from './Product'
import Client from './Client'
import Kit from './Kit'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pdv)
  public pdv: BelongsTo<typeof Pdv>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Kit)
  public kit: BelongsTo<typeof Kit>

  @column()
  public kitId: number

  @column()
  public pdvId: number

  @column()
  public quantity: number

  @column()
  public clientId: number



  @column()
  public productId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
