import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Kit from './Kit'

export default class KitProduct extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Kit)
  public kit: BelongsTo<typeof Kit>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @column()
  public productId: number

  @column()
  public kitId: string

  @column()
  public quantity: number

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  /*  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime
   map: any */
}
