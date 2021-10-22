import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokensFuncionarios extends BaseSchema {
  protected tableName = 'api_tokens_funcionarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('token', 64).notNullable().unique()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
