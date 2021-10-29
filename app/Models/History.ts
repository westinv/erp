import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client';
import Product from './Product';
import SignatureClient from './SignatureClient';

export default class History extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public payment: string;

  @belongsTo (()=> Client)
  public history: BelongsTo<typeof Client>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @hasMany(()=> SignatureClient)
  public signature: HasMany<typeof SignatureClient>

  @column()
  public productId: number

  @column()
  public clientId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}