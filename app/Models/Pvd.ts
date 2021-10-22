import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pvd extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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
  public reference_point: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
