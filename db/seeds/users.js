exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'Alice', password:'123'}),
        knex('users').insert({username: 'Bob', password: '345'}),
        knex('users').insert({username: 'Charlie', password: '678'})
      ]);
    });
};
