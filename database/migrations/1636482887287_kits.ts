import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Kits extends BaseSchema {
  protected tableName = 'kits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.float('quantity').notNullable()
      table.float('price').notNullable()
      table.float('discount').notNullable()
      table.float('shipping').notNullable()
      table.string('description').notNullable()

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
