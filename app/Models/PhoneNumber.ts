import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pdv from './Pdv';


export default class PhoneNumber extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  public phoneNumber: string;

  @belongsTo(() => Pdv)
  public pdv: BelongsTo<typeof Pdv>

  @column()
  public pdvId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
