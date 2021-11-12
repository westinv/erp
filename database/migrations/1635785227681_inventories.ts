import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Inventories extends BaseSchema {
  protected tableName = 'inventories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()







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
