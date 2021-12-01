import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import FixedExpense from './FixedExpense'

import Pdv from './Pdv'

export default class CostHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @belongsTo(() => Pdv)
  public pvd: BelongsTo<typeof Pdv >

  @column()
  public pvdId: number

  @belongsTo(() => FixedExpense)
  public fixedExpense: BelongsTo<typeof FixedExpense>

  @column()
  public costId: number

  @column()
  public fixedExpenseId: number





  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
