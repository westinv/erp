import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client';
import Product from './Product';
import Signature from './Signature';
import Pvd from './Pdv';

export default class History extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public payment: string;

  @belongsTo (()=> Client)
  public history: BelongsTo<typeof Client>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Pvd)
  public pdv: BelongsTo<typeof Pvd>

  @belongsTo(() => Signature)
  public signature: BelongsTo<typeof Signature>

  @column()
  public signatureId: string;

  @column()
  public pdvId: string;

  @column()
  public productId: string

  @column()
  public clientId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
