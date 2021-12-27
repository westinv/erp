import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import SignatureClient from './SignatureClient'
import Pvd from './Pdv'
import SignatureCreate from './SignatureCreate'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Pvd)
  public pdv: BelongsTo<typeof Pvd>

  @hasMany(() => SignatureCreate)
  public signatureIds: HasMany<typeof SignatureCreate>

  @hasMany(()=> SignatureClient)
  public accounts: HasMany<typeof SignatureClient>

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
  public clientCode : string
  
  @column()
  public discount : number

  @column()
  public shipping : number



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
