import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import SignatureClient from './SignatureClient'
import Pvd from './Pdv'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pvd)
  public pdv: BelongsTo<typeof Pvd>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @hasMany(()=> SignatureClient)
  public accounts: HasMany<typeof SignatureClient>


  @column()
  public productId: string

  @column()
  public pdvId: string

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
