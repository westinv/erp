import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Kits extends BaseSchema {
  protected tableName = 'kits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.string('quantity').notNullable()
      table.string('price').notNullable()
      table.string('discount').notNullable()
      table.string('shipping').notNullable()
      table.string('kit_description').notNullable()

      table
          .integer('product_id')
          .unsigned()
          .references('id')
          .inTable('products')
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
