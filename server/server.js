'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const app = express();

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2', 'key3'],
}));

const naturalTextAnalyzer = require('./test_parallel_dots');

// Separated Routes for each Resource
const usersRoutes = require('./routes/users');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes,
// cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));



// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Mount all resource routes
app.use('/api/users', usersRoutes(knex));


// >>>>>>>>>>>>>>>>>>>>>HOMEPAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// renders the Home page
app.get('/', (req, res) => {
  res.render('index');
});

//catches info from the create new items page and saves it into db.
app.post('/save_item', (req, res) => {

  if (req.session.user_id) {
    let analyzeResult = '';
    naturalTextAnalyzer(req.body.title).then(answer => {
      analyzeResult += answer;

      knex('items').insert({
        title: req.body.title,
        description: req.body.description,
        complete: false,
        date_created: req.body.date,
        category: analyzeResult,
        user_id: 22
      }).then(result => {
        window.alert('ITEM CREATED IN CATEGORY' + analyzeResult);
        // console.log("INSERTION WAS COMPLETE" + analyzeResult);
      });

      res.redirect('/');
    })
  } else {
    //alert("You have not logged in yet. Redirecting to register page.");
    res.redirect('/register');
  }



});

// >>>>>>>>>>>>>>>>>>>>>RESTAURANT PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// renders the restaurant page with all of the items with category restaurant
// as well as complete = false.
app.get('/category/restaurant', (req, res) => {
  if (req.session.user_id) {
    knex('items').where({
      category: 'restaurants',
      complete: false,
      user_id: req.session.user_id
    }).then(dbData => {
      const restaurant_items = [];
      for (let item of dbData) {
        restaurant_items.push(item);
      }
      const templateVars = {
        items: restaurant_items,
        // users: user.username
      }
      // console.log(user.username)
      res.render('restaurants', templateVars);
    });
  } else {
    res.redirect('/register');
  }

});

//post action to set completed = true.
app.post('/category/restaurant/completed', (req, res) => {

  knex('items').where({
    id: req.body.id
  }).update({
    complete: true
  }).then(item => {
    console.log(item)
    res.redirect('/category/restaurant')
  });
});


// >>>>>>>>>>>>>>>>>>>>>BOOK PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// renders the book page with all of the items with category book
// as well as complete = false.
app.get('/category/book', (req, res) => {
  console.log(req.session.user_id);
  if (req.session.user_id) {
    knex('items').where({
      category: 'books',
      complete: false,
      user_id: req.session.user_id
    }).then(dbData => {
      const book_items = [];
      for (let item of dbData) {
        book_items.push(item);
      }
      const templateVars = {
        items: book_items,
        // users: user.username
      }
      res.render('books', templateVars);
    });
  } else {
    res.redirect('/register');
  }

});

//post action to set completed = true.
app.post('/category/book/completed', (req, res) => {

  //console.log(req.body);
  knex('items').where({
    id: req.body.id
  }).update({
    complete: true
  }).then(item => {
    console.log(item)
    res.redirect('/category/book')
  });
});


// >>>>>>>>>>>>>>>>>>>>>MOVIE PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// renders the movie page with all of the items with category movie
// as well as complete = false.
app.get('/category/movie', (req, res) => {
  if (req.session.user_id) {
    knex('items').where({
      category: 'movies',
      complete: false,
      user_id: req.session.user_id
    }).then(dbData => {
      const movie_items = [];
      for (let item of dbData) {
        movie_items.push(item);
      }
      console.log('movie items is: ', movie_items);

      const templateVars = {
        items: movie_items,
        // users: user.username

      };
      res.render('movies', templateVars);
    });
  } else {
    res.redirect('/register');
  }

})

//post action to set completed = true.
app.post('/category/movie/completed', (req, res) => {

  // console.log(req.body.id);
  //res.redirect("/category/movie");
  knex('items').where({
    id: req.body.id
  }).update({
    complete: true
  }).then(item => {
    console.log(item)
    res.redirect('/category/movie')
  });
});


// >>>>>>>>>>>>>>>>>>>>>PRODUCT PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// renders the product page with all of the items with category product
// as well as complete = false.
app.get('/category/product', (req, res) => {
  if (req.session.user_id) {
    knex('items').where({
      category: 'products',
      complete: false,
      user_id: req.session.user_id
    }).then(dbData => {
      const product_items = [];
      for (let item of dbData) {
        product_items.push(item);
      }
      console.log('product items is: ', product_items);
      const templateVars = {
        items: product_items,

        // user: user.username
      }
      res.render('products', templateVars);
    });
  } else {
    res.redirect('/register');
  }

})

//post action to set completed = true.
app.post('/category/product/completed', (req, res) => {

  //console.log(req.body);
  knex('items').where({
    id: req.body.id
  }).update({
    complete: true
  }).then(item => {
    console.log(item)
    res.redirect('/category/product')
  });
});



// >>>>>>>>>>>>>>>>>>>>>>LOGIN/LOGOUT PAGE POST FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

app.post('/login', (req, res) => {
  //console.log(req.body.username, req.body.password);
  knex('users').where({
    username: req.body.username,
    password: req.body.password
  }).then(user => {
    if (user === []) {
      return res.status(403).send('Email or password is invalid.');
    } else {
      //console.log("DEBUG", user[0].id);
      req.session.user_id = user[0].id;
      //console.log("DEBUG", req.session.user_id);
      res.redirect('/');
    }

  })

});

// // logs the user out and clears cookie-session
// app.post('/logout', (req, res) => {
//   req.session.user_id = null;
//   res.redirect('/register');
// })



// >>>>>>>>>>>>>>>>>>>>>>REGISTER PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// renders the register page.
app.get('/register', (req, res) => {
  res.render('register');
});


//creates user and inserts into database.
app.post('/register', (req, res) => {

  // console.log(req.body.username);
  knex('users').insert({
    username: req.body.username,
    password: req.body.password
  }).then(result => {
    console.log('INSERTION WAS COMPLETE');
    res.redirect('/');
  });

});


app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
