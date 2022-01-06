import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SignatureCreates extends BaseSchema {
  protected tableName = 'signature_creates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {


      table.increments('id').primary()

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

      table
        .integer('signature_id')
        .unsigned()
        .references('id')
        .inTable('signatures')
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
