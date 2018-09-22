"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session')
 


const naturalTextAnalyzer = require('./test_parallel_dots');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes,
// cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


// log cookie session to users after they sign in
app.use(cookieSession({
  user_id: 'session',
  keys: ['key1'],
}));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));


// >>>>>>>>>>>>>>>>>>>>>HOMEPAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// renders the Home page
app.get("/", (req, res) => {
  res.render("index");
});

//catches info from the create new items page and saves it into db.
app.post("/save_item", (req, res) => {

  let analyzeResult = "";
  let date = new Date(req.body.date);
  naturalTextAnalyzer(req.body.title).then(answer => {
    analyzeResult += answer;

    knex('items').insert({
      title: req.body.title,
      description: req.body.description,
      complete: false,
      date_created: date,
      category: analyzeResult,
      user_id: 5
    }).then(result => {
      console.log("INSERTION WAS COMPLETE" + analyzeResult);
    });

    res.redirect("/");
  })


});

// >>>>>>>>>>>>>>>>>>>>>RESTAURANT PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//renders the skeleton of the restaurant page.
app.get("/category/restaurant", (req, res) => {
  knex('items').where('category', 'restaurants').then(dbData => {
    const restaurant_items = [];
    for(item of dbData) {
      restaurant_items.push(item);
    }
    const templateVars = {
      items: restaurant_items,
      user: users[req.session.user_id]
    }
    res.render("restaurants", templateVars);
  });
});


// >>>>>>>>>>>>>>>>>>>>>BOOK PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//renders the skeleton of the book page.
app.get("/category/book", (req, res) => {
  knex('items').where('category', 'books').then(dbData => {
    const book_items = [];
    for(let item of dbData) {
      book_items.push(item);
    }
    const templateVars = {
      items: book_items,
      user: users[req.session.user_id]
    }
      res.render("books", templateVars);
  });
})


// >>>>>>>>>>>>>>>>>>>>>MOVIE PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//renders the skeleton of the movie page.
app.get("/category/movie", (req, res) => {
  knex('items').where('category', 'movies').then(dbData => {
    const movie_items = [];
    for(let item of dbData) {
      movie_items.push(item);
    }
    console.log("movie items is: ", movie_items);

    const templateVars = {
      items: movie_items,
      user: users[req.session.user_id]
  
    };
      res.render("movies", templateVars);
  });
})


// >>>>>>>>>>>>>>>>>>>>>PRODUCT PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//renders the skeleton of the product page.
app.get("/category/product", (req, res) => {
  knex('items').where('category', 'products').then(dbData => {
      const product_items = [];
      for(let item of dbData) {
        product_items.push(item);
      }
      const templateVars = {
        items: product_items,
        user: users[req.session.user_id]
      }
        res.render("movies", templateVars);
    });
})


// >>>>>>>>>>>>>>>>>>>>>>REGISTER PAGE POST/GET FUNCTIONS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// renders the register page.
app.get("/register", (req, res) => {

  res.render("register");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


