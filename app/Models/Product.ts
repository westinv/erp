import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Signature from './Signature'
import History from './History'
import Kit from './Kit'
import Pvd from './Pdv'


export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(()=> Signature)
  public signature: HasMany<typeof Signature>

  @hasMany(()=> History)
  public history: HasMany<typeof History>

  @hasMany(()=>Kit )
  public kit: HasMany<typeof Kit>

  @belongsTo(() => Pvd)
  public pdv: BelongsTo<typeof Pvd>

  @column()
  public pdvId: string

  @column()
  public description: string

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public discount: number

  @column()
  public shipping: number

  @column()
  public quantity: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
