import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description').notNullable()
      table.string('name').notNullable()
      table.float('price').notNullable()
      table.float ('discount')
      table.float('shipping')
      table.float('quantity').notNullable()

      table
          .integer('pdv_id')
          .unsigned()
          .references('id')
          .inTable('pdvs')
          .onDelete('CASCADE')

          /* table
          .integer('kit_id')
          .unsigned()
          .references('id')
          .inTable('kits')
          .onDelete('CASCADE') */

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
