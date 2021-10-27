import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Account from './Account'
import Pvd from './Pvd'

export default class Salesman extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(()=> Account)
  public accounts: HasMany<typeof Account>

  @hasMany(()=> Pvd)
  public pvd: HasMany<typeof Pvd>

  @column()
  public name: string

  @column()
  public cnpj: string

  @column()
  public cpf: string

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public district: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(salesman: Salesman) {
    if (salesman.$dirty.password) {
        salesman.password = await Hash.make(salesman.password)
    }
  }
}
