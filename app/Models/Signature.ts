import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Pvd from './Pvd'
import SignatureClient from './SignatureClient'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pvd)
  public pvd: BelongsTo<typeof Pvd>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @hasMany(()=> SignatureClient)
  public accounts: HasMany<typeof SignatureClient>


  @column()
  public productId: string

  @column()
  public pvdId: string

  @column()
  public name: string

  @column()
  public price: string

  @column()
  public duration: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
