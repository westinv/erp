import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Salesman from './Salesman'
export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @belongsTo(() => Salesman)
  public salesmen: BelongsTo<typeof Salesman>
  
  @column()
  public salesmanId: number;

  @column()
  public email: string

  @column()
  public password: string

  @column({ serializeAs: null })
  public username: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(account: Account) {
    if (account.$dirty.password) {
        account.password = await Hash.make(account.password)
    }
  }
}
