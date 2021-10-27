import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pvd from './Pvd';

export default class PhoneNumber extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  public phoneNumber: string;

  @belongsTo(() => Pvd)
  public pvd: BelongsTo<typeof Pvd>

  @column()
  public pvdId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
