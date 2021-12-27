import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Signature from './Signature'

export default class SignatureCreate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Signature)
  public signature: BelongsTo<typeof Signature>

  @column()
  public productId: number

  @column()
  public kitId: string

  @column()
  public signatureId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
