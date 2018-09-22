const naturalTextAnalyzer = require('./test_parallel_dots');

const string = "soccer";

naturalTextAnalyzer(string)
  .then( answer => {
    console.log(answer);
  })
