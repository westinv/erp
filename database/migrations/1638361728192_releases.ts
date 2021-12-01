import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Releases extends BaseSchema {
  protected tableName = 'releases'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string("description").notNullable()
      table.float('price').notNullable()
      table.string('transaction_type').notNullable()
      table.string('name').notNullable()
      table.string('bank').notNullable()


      table
          .integer('pdv_id')
          .unsigned()
          .references('id')
          .inTable('pdvs')
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
