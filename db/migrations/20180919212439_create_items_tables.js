exports.up = function (knex, Promise) {
  return knex.schema.createTable('items', function (table) {
    table.increments('id').unsigned().primary(),
    table.string('title', [45]).notNullable(),
    table.string('description', [45]).notNullable(),
    table.boolean('complete').notNullable().defaultTo(false),
    table.string('date_created').notNullable(),
    table.enu('category', ['movies', 'restaurants', 'books', 'products']).notNullable(),
    table.integer('user_id').references('id').inTable('users').notNullable()
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('items');
};
