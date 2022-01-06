import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import SignatureClient from './SignatureClient'
import Pvd from './Pdv'
import SignatureCreate from './SignatureCreate'
import Account from './Account'
import Salesman from './Salesman'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pvd)
  public pdv: BelongsTo<typeof Pvd>

  @hasMany(() => SignatureCreate)
  public signatureIds: HasMany<typeof SignatureCreate>

  @hasMany(() => SignatureClient)
  public accounts: HasMany<typeof SignatureClient>

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Salesman)
  public salesman: BelongsTo<typeof Salesman>

  @column()
  public accountId: number

  @column()
  public salesmanId: number

  @column()
  public pdvId: string

  @column()
  public signatureId: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public note: string

  @column()
  public clientCode: string

  @column()
  public discount: number

  @column()
  public shipping: number



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
