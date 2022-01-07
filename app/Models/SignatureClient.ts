import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Signature from './Signature'
import Account from './Account'
import Salesman from './Salesman'

export default class SignatureClient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Signature)
  public signature: BelongsTo<typeof Signature>

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Salesman)
  public salesman: BelongsTo<typeof Salesman>

  @column()
  public historyId: string

  @column()
  public signatureId: string

  @column()
  public clientId: string

  @column()
  public accountId: number

  @column()
  public salesmanId: number

  @column()
  public signatureDate: string

  @column()
  public clientCode: string

  @column()
  public dueDate: string

  @column()
  public activeSubscription: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
