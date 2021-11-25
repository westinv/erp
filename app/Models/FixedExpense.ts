import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pdv from './Pdv'

export default class FixedExpense extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pdv)
  public pdv: BelongsTo<typeof Pdv>

  @column()
  public pdvId: number

  @column()
  public description: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
