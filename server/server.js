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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes,
// cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

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

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


//renders the skeleton of the restaurant page.
app.get("/category/restaurant", (req, res) => {
  knex('items').where('category', 'restaurants').then(dbData => {
    const restaurant_items = [];
    for(item of dbData) {
      restaurant_items.push(item);
    }
    const templateVars = {
      items: restaurant_items
    }
    res.render("restaurants", templateVars);
  });
});


//renders the skeleton of the book page.
app.get("/category/book", (req, res) => {
  knex('items').where('category', 'books').then(dbData => {
    const book_items = [];
    for(let item of dbData) {
      book_items.push(item);
    }
    const templateVars = {
      items: book_items
    }
      res.render("books", templateVars);
  });
})


//renders the skeleton of the movie page.
app.get("/category/movie", (req, res) => {
  knex('items').where('category', 'movies').then(dbData => {
    const movie_items = [];
    for(let item of dbData) {
      movie_items.push(item);
    }
    console.log("movie items is: ", movie_items);

    const templateVars = {
      items: movie_items
    }
      res.render("movies", templateVars);
  });
})


//renders the skeleton of the product page.
app.get("/category/product", (req, res) => {
  knex('items').where('category', 'products').then(dbData => {
      const product_items = [];
      for(let item of dbData) {
        product_items.push(item);
      }
      const templateVars = {
        items: product_items
      }
        res.render("movies", templateVars);
    });
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


