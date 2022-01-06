import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import History from './History'
import SignatureClient from './SignatureClient'
import Pvd from './Pdv'
import Salesman from './Salesman'
import Account from './Account'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pvd)
  public pdv: BelongsTo<typeof Pvd>

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Salesman)
  public salesman: BelongsTo<typeof Salesman>


  @hasMany(() => History)
  public history: HasMany<typeof History>

  @hasMany(() => SignatureClient)
  public signatureClient: HasMany<typeof SignatureClient>

  @column()
  public clientCode: string

  @column()
  public pdvId: number

  @column()
  public accountId: number

  @column()
  public salesmanId: number

  @column()
  public name: string

  @column()
  public number: string

  @column()
  public address: string

  @column()
  public state: string

  @column()
  public city: string

  @column()
  public district: string

  @column()
  public cep: string

  @column()
  public complement: string

  @column()
  public phone: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
