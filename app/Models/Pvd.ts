import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import Salesman from './Salesman'
import PhoneNumber from './PhoneNumber'

export default class Pvd extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo (()=> Account)
  public account: BelongsTo<typeof Account>

  @hasMany(()=> PhoneNumber)
  public phoneNumber: HasMany<typeof PhoneNumber>

  @column()
  public accountId: number

  @column()
  public state: string

  @column()
  public companyName: number

  @column()
  public tradeName: number


  @belongsTo(() => Salesman)
  public salesman: BelongsTo<typeof Salesman>

  @column()
  public salesmanId: number

  @column()
  public name: string

  @column()
  public cnpj: string

  @column()
  public description: string

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public district: string

  @column()
  public cep: string

  @column()
  public complement: string

  @column()
  public referencePoint: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
