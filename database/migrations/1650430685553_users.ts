import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name',50)
      table.string('last_name',50)
      table.string('username',50).index()
      table.string('email',80).index()
      table.string('avatar').nullable()
      table.text('details').nullable()
      table.string('password')
      table.string('code')
      table.dateTime('email_verified_at').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
