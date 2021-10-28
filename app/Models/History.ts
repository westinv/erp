import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client';

export default class History extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public payment: string;

  @belongsTo (()=> Client)
  public history: BelongsTo<typeof Client>

  @column()
  public clientId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
