import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SignatureClients extends BaseSchema {
  protected tableName = 'signature_clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
          .integer('client_id')
          .unsigned()
          .references('id')
          .inTable('clients')
          .onDelete('CASCADE')

      /* table
          .integer('signature_id')
          .unsigned()
          .references('id')
          .inTable('signatures')
          .onDelete('CASCADE') */


      table.string("signature_date").notNullable
      table.string("due_date").notNullable
      table.boolean('active_subscription').notNullable


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
