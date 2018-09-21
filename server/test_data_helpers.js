const testDataHelpers = require('./data_helpers')();

const getItemsCallback = function(err, data) {
    if(err){
        console.log(err);
        throw new Error(err);
    }
    console.log({data});
        
}
console.log(testDataHelpers.getItems('movies', getItemsCallback));
//console.log(testDataHelpers);