exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').unsigned().primary(),
    table.string('username').notNullable(),
    table.string('password').notNullable()
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
