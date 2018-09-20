const seedData = [{
  user: {
    username: 'Alice',
    password: '123'
  },
  items: [{
      title: 'Teaching',
      description: 'Teaching kids how to code',
      complete: false,
      date_created: '2016-02-17',
      category: 'movies'
    },
    {
      title: 'Shopping',
      description: 'Shopping at forever 21 for socks',
      complete: false,
      date_created: '2017-03-23',
      category: 'books'
    }
  ]
}]


const insertUser = (knex, {
  username,
  password
}) => {
  return new Promise( resolve => {
    knex('users')
      .insert({
        username,
        password
      })
      .returning("*")
      .then( ([user, ...rest]) => resolve(user))
  })
}

const insertItemForUser = (knex, user, {
  title,
  description,
  complete,
  date_created,
  category
}) => {
  return knex('items').insert({
    title,
    description,
    complete,
    date_created,
    category,
    user_id: user.id
  })
}

const insertRecord = (knex, record) => {
  return new Promise(resolve => {
    insertUser(knex, record.user)
      .then(user => {
        Promise.all(record.items.map(item => insertItemForUser(knex, user, item)))
          .then(() => {
            resolve()
          })
      })
  })
}


exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex('items').del()
    })
    .then(function () {
      return Promise.all(seedData.map(record => insertRecord(knex, record)))
    })
};

