import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Accounts extends BaseSchema {
    protected tableName = 'accounts'

    public async up () {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table
          .integer('salesman_id')
          .unsigned()
          .references('id')
          .inTable('salesmen')
          .onDelete('CASCADE')

        table.string('password').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('username').notNullable().unique()
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
    }

    public async down () {
      this.schema.dropTable(this.tableName)
    }
}
