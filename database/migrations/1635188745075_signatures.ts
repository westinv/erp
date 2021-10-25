import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Signatures extends BaseSchema {
  protected tableName = 'signatures'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('products_id').unsigned().references('id').inTable('products').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
