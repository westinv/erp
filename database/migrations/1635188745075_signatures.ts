import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Signatures extends BaseSchema {
  protected tableName = 'signatures'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pvds_id').unsigned().references('id').inTable('pvds').onDelete('CASCADE')

      //table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')




      table.string('name')
      table.string('price')
      table.string('duration')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
