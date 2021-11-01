import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('pvd_id').unsigned().references('id').inTable('pvds').onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('address').notNullable()
      table.string('city').notNullable()
      table.string('district').notNullable()
      table.string('cep').notNullable()
      table.string('complement').notNullable()
      table.string('phone').notNullable()
      table.string('state').notNullable()
      table.string('number').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
