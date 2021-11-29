import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pdv from './Pdv'
import FixedExpense from './FixedExpense'

export default class Cost extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public price: number

  @belongsTo(() => Pdv)
  public pvd: BelongsTo<typeof Pdv >

  @hasMany(() => FixedExpense)
  public fixedExpense: HasMany<typeof FixedExpense>

  @column()
  public pdvId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
