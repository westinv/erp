import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description').notNullable()
      table.string('name').notNullable()
      table.string('price').notNullable()
      table.string('discount')
      table.string('shipping')
      table.string('quantity').notNullable()

      table
          .integer('pvd_id')
          .unsigned()
          .references('id')
          .inTable('pvds')
          .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
