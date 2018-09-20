const naturalTextAnalyzer = require('./test_parallel_dots');

const string = "Donald Trump is President of America.";

naturalTextAnalyzer(string)
  .then( answer => {
    console.log(answer);
  })
