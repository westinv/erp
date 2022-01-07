import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pdv from './Pdv'
import Account from './Account'
import Salesman from './Salesman'

export default class Release extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pdv)
  public pdv: BelongsTo<typeof Pdv>

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Salesman)
  public salesman: BelongsTo<typeof Salesman>

  @column()
  public accountId: number

  @column()
  public salesmanId: number

  @column()
  public pdvId: number

  @column()
  public name: string

  @column()
  public bank: string

  @column()
  public transactionType: string

  @column()
  public description: string

  @column()
  public price: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
