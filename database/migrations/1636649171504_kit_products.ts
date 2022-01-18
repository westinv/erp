import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class KitProducts extends BaseSchema {
  protected tableName = 'kit_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.float('quantity')
      table.float('value')
      table
      .integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')

      table
      .integer('kit_id')
      .unsigned()
      .references('id')
      .inTable('kits')
      .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
