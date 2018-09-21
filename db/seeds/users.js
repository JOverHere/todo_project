exports.seed = function(knex, Promise) {

  function deleteUsers() {
    return knex('users').del()
  }

  function deleteItems() {
    return knex('items').del()
  }

  function insertItems(users) {
    return knex('items').insert([
      {title: 'shopping', description:'going to forever 21 for stripe socks', complete: false, date_created: '2016-02-09', category: 'products', user_id: users[0]},
      {title: 'teaching', description:'teaching kids how to code', complete: false, date_created: '2016-03-09', category: 'books', user_id: users[1]},
      {title: 'studying', description:'studying for a french exam', complete: false, date_created: '2016-04-09', category: 'restaurants', user_id: users[2]},
      {title: 'fishing', description:'fishing for sharks', complete: false, date_created: '2017-02-09', category: 'products', user_id: users[0]},
      {title: 'watch movies', description:'watch avengers at cineplex', complete: false, date_created: '2017-04-09', category: 'books', user_id: users[2]},
      {title: 'back-yard', description:'remove leafs from back-yard', complete: false, date_created: '2017-03-09', category: 'movies', user_id: users[1]},
      {title: 'cooking', description:'cook poutine for my family', complete: false, date_created: '2017-05-08', category: 'restaurants', user_id: users[0]},
      {title: 'biking', description:'biking in the mountains', complete: false, date_created: '2017-06-06', category: 'books', user_id: users[1]},
      {title: 'napping', description:'2 hour nap before the gym', complete: false, date_created: '2017-07-09', category: 'movies', user_id: users[2]},
      {title: 'learn HTML', description:'learn advance HTML5', complete: false, date_created: '2016-08-09', category: 'products', user_id: users[2]},
      {title: 'go Kart', description:'Go karting for 3 hours', complete: false, date_created: '2016-09-09', category: 'books', user_id: users[0]},
      {title: 'visit mom', description:'visit my mom in another province', complete: false, date_created: '2016-12-09', category: 'movies', user_id: users[1]},
      {title: 'family trip', description:'family trip to Aruba', complete: false, date_created: '2016-12-19', category: 'products', user_id: users[1]},
      {title: 'play NBA 2K', description:'play NBA 2K with my friend', complete: false, date_created: '2016-11-09', category: 'restaurants', user_id: users[1]},
      {title: 'Read balance sheet', description:'Read balance sheet on morningstar.com', complete: false, date_created: '2018-02-09', category: 'movies', user_id: users[2]},
      {title: 'feed dog', description:'feed my dog at 4:30pm', complete: false, date_created: '2018-03-09', category: 'products', user_id: users[0]},
      {title: 'watch netflix', description:'watch documentary', complete: false, date_created: '2018-04-09', category: 'books', user_id: users[2]},
      {title: 'walk', description:'go for a 30 minute walk', complete: false, date_created: '2018-05-09', category: 'movies', user_id: users[1]},
      {title: 'watch youtube', description:'watching my favorite youtube for 2 hours', complete: false, date_created: '2018-06-09', category: 'products', user_id: users[1]},
      {title: 'setup wifi', description:'setup wifi in the basement', complete: false, date_created: '2018-07-09', category: 'books', user_id: users[2]}
  
    ]).returning('*');
  }

  function insertUsers() {
    return knex('users').insert([
      {username: 'Arnie Hammer', password: '123'},
      {username: 'Emma Stone', password: '456' },
      {username: 'Tom Hardy', password: '789' },
      {username: 'Ally Ben', password: '123'},
      {username: 'Emma Brown', password: '456' },
      {username: 'Tom Hill', password: '789' },
      {username: 'Bill Ham', password: '123'},
      {username: 'Emily Stan', password: '456' },
      {username: 'Tom Bowie', password: '789' },
      {username: 'Allen Johnson', password: '123'},
      {username: 'Sid Steele', password: '456' },
      {username: 'Tim Halo', password: '789' },
      {username: 'Jimmy Hammer', password: '123'},
      {username: 'John Doe', password: '456' },
      {username: 'Pat Hardy', password: '789' },
      {username: 'Amy klein', password: '123'},
      {username: 'Brent Faiyaz', password: '456' },
      {username: 'Tiff Fallon', password: '789' },
      {username: 'Arlo Han', password: '123'},
      {username: 'Zen Steve', password: '456' },
    
    ]).returning('id');

  }

  return deleteItems()
    .then(deleteUsers)
    .then(insertUsers)
    .then(users => insertItems(users))

};


















































// exports.seed = function(knex, Promise) {
//   return knex('users').del()
//     .then(function () {
//       return Promise.all([
//         knex('users').insert({username: 'Alice', password:'123'}),
//         knex('users').insert({username: 'Bob', password: '345'}),
//         knex('users').insert({username: 'Charlie', password: '678'})
//       ]);
//     });
// };




// exports.seed = function(knex, Promise) {
//   return knex('items').del()
//     .then(function () {
//       return Promise.all([
//         knex('items').insert({title: 'shopping', description:'going to forever 21 for stripe socks', complete: false, date_created: '2016-02-09', category: 'products'}),
//         knex('items').insert({title: 'teaching', description:'teaching kids how to code', complete: false, date_created: '2016-02-09', category: 'books'}),
//         knex('items').insert({title: 'studying', description:'studying for a french exam', complete: false, date_created: '2016-02-09', category: 'movies'}),
//       ]);
//     });
// };





