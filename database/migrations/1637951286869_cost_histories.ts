import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CostHistories extends BaseSchema {
  protected tableName = 'cost_histories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      /* table
          .integer('release_id')
          .unsigned()
          .references('id')
          .inTable('releases')
          .onDelete('CASCADE') */

      table
        .integer('fixed_expenses_id')
        .unsigned()
        .references('id')
        .inTable('fixed_expenses')
        .onDelete('CASCADE')

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

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
