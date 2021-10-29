import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pvds extends BaseSchema {
  protected tableName = 'pvds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE')
      table.integer('salesman_id').unsigned().references('id').inTable('salesmen').onDelete('CASCADE')

      table.string('trade_name').notNullable()
      table.string('company_name').notNullable()
      table.string('state').notNullable()
      table.string('cnpj').notNullable()
      table.string('description').notNullable()
      table.string('address').notNullable()
      table.string('city').notNullable()
      table.string('district').notNullable()
      table.string('cep').notNullable()
      table.string('complement').notNullable()
      table.string('reference_point').notNullable()
      table.string('number').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
