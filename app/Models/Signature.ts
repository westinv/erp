import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
//import Product from './Product'
import Pvd from './Pvd'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pvd)
  public pvd: BelongsTo<typeof Pvd>

  @column()
  public pvdId: number

  @column()
  public name: string

  @column()
  public price: string

  @column()
  public duration: string

  /* @belongsTo(() => Product)
  public product: BelongsTo<typeof Product> */

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
