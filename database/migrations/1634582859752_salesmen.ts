import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salesmen extends BaseSchema {
  protected tableName = 'salesmen'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('cpf').unique()
      table.string('cnpj').notNullable().unique()
      table.string('address').notNullable()
      table.string('number').notNullable()
      table.string('city').notNullable()
      table.string('district').notNullable()
      table.string('complements').notNullable()
      table.string('email').notNullable().unique()
      table.string('phone').notNullable()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
