const textAnalyzer = require('./test_parallel_dots');

module.exports = function makeDataHelpers() {
    return {
      // saves a new to-do Item into database using knex.
      // arguments 
      // newItem should be an object with key value pair of key being column in db and 
      // value being the value in the column.
      saveItem: (newItem) => {

        knex('items')
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
                  return console.err(err);
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
        knex('items').where({category:category})
        .select()
        .asCallback((err, rows) => {
            if(err) {
                return console.err(err);
            }
            callback(err, rows);
        })

      };

    }
