

const knexConfig  = require("../knexfile");

console.log({knexConfig})

const env = process.env.ENV || 'development';

console.log({ env })

const knex        = require("knex")(knexConfig[env]);



const textAnalyzer = require('./test_parallel_dots');

module.exports = function makeDataHelpers() {
    return {
      // saves a new to-do Item into database using knex.
      // arguments 
      // newItem should be an object with key value pair of key being column in db and 
      // value being the value in the column.
      saveItem: (newItem) => {

        db.knex('items')
          .insert({
              title: newItem.title,
              description: newItem.description,
              complete: false,
              date_created: newItem.date_created,
              category: textAnalyzer(newItem.description),
              // need to implement user_id to take in cookie session.s
              user_id: 1
            }
          ).asCallback((err, row) => {
              if(err){
                  return console.log(err);
              }
              console.log('success');
          })
          .returning('*')
          .then(data => {
            console.log("RETURN FROM INSERT", data)
          })

      },

      // gets all to-do Items in the database from a given category.
      getItems: (category, callback) => {
          db.knex.select('*').from('items')
          .then(data => console.log({data}))
          .catch(err => console.log({err}))
        // knex('items').where({category:category})
        // .select()
        // .asCallback((err, rows) => {
        //     if(err) {

        //         callback(err)
        //     }
        //     callback(null, rows);
        // })

      }

    }

}
