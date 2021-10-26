import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SignatureClient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public signature_date : string

  @column()
  public due_date: string

  @column()
  public active_subscription: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
