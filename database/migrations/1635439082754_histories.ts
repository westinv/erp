import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Histories extends BaseSchema {
  protected tableName = 'histories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('payment')
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')

      table
        .integer('pdvs_id')
        .unsigned()
        .references('id')
        .inTable('pdvs')
        .onDelete('CASCADE')

      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')

      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE')
      table.integer('salesman_id').unsigned().references('id').inTable('salesmen').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
