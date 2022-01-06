import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import Salesman from './Salesman'
import PhoneNumber from './PhoneNumber'
import Signature from './Signature'
import Client from './Client'

export default class Pdv extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @hasMany(() => PhoneNumber)
  public phoneNumber: HasMany<typeof PhoneNumber>

  @hasMany(() => Client)
  public client: HasMany<typeof Client>

  @hasMany(() => Signature)
  public signature: HasMany<typeof Signature>

  @belongsTo(() => Salesman)
  public salesman: BelongsTo<typeof Salesman>

  @column()
  public isActive: boolean

  @column()
  public accountId: number

  @column()
  public number: string

  @column()
  public state: string

  @column()
  public companyName: number

  @column()
  public tradeName: number

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
  public landmark: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
