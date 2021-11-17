import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sales extends BaseSchema {
  protected tableName = 'sales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

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

        table
          .integer('client_id')
          .unsigned()
          .references('id')
          .inTable('clients')
          .onDelete('CASCADE')

        table
          .integer('kit_products_id')
          .unsigned()
          .references('id')
          .inTable('kit_products')
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
