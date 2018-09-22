const naturalTextAnalyzer = require('./test_parallel_dots');

const string = "buy pants";

naturalTextAnalyzer(string)
  .then( answer => {
    //console.log(answer);
  })
