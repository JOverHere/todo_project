"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
        //console.log(results);
    });
  });

  router.get("/category/restaurant", (req, res) => {
    res.redirect('/restaurant');
  })

  return router;
}
