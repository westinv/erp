import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PhoneNumbers extends BaseSchema {
  protected tableName = 'phone_numbers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
          .integer('pdvs_id')
          .unsigned()
          .references('id')
          .inTable('pdvs')
          .onDelete('CASCADE')
      table.string('phoneNumber').notNullable()

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
