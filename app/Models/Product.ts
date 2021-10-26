import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Signature from './Signature'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(()=> Signature)
  public signature: HasMany<typeof Signature>

  @column()
  public description: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
