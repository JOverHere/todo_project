const fetch = require('node-fetch')
const FormData = require('form-data')

const category = {
 finance: ["markets","economy","shares"]
}
module.exports = text => {
  return new Promise( resolve => {
    const body = new FormData()
    body.append('api_key', 'fpc0gartgi7FlbGsmqbPYpiKH3SfWhfj2DAdV9onmu8')
    body.append('text', text)
    body.append('category', JSON.stringify(category))

    fetch(
      'https://apis.paralleldots.com/v3/custom_classifier',
      {
        method: 'POST',
        body: body,
        headers: {
          'accept': 'application/json'
        }
      }
    )
    .then( resp => {
      if (!resp.ok) {
        throw "Error"
      }
      return resp.json()
    })
    .then( ({taxonomy}) => {
      taxonomy.sort( (a,b) => (a.confidence_score - b.confidence_score));
      resolve(taxonomy[0].tag);
    })
    .catch( err => {
      throw err
    })
  })
}
