import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Signature from './Signature'
import History from './History'

export default class SignatureClient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo (()=> Client)
  public client: BelongsTo<typeof Client>

  @belongsTo (()=> Signature)
  public signature: BelongsTo<typeof Signature>

  @belongsTo (()=> History)
  public history: BelongsTo<typeof History>

  @column()
  public historyId : number

  @column()
  public signatureId : number

  @column()
  public clientId : number

  @column()
  public signatureDate : string

  @column()
  public dueDate: string

  @column()
  public activeSubscription: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
