import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Signature from './Signature'
import History from './History'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(()=> Signature)
  public signature: HasMany<typeof Signature>

  @hasMany(()=> History)
  public history: HasMany<typeof History>


  @column()
  public description: string

  @column()
  public name: string

  @column()
  public price: string

  @column()
  public discount: string

  @column()
  public freight: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
