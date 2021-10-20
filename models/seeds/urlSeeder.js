const db = require('../../config/mongoose')
const Url = require('../url')
const Utility = require('../../utility')

db.once('open', () => {
  
  for (let i = 0; i < 10; i++) {
    const suffix = Utility.suffixGenerator()
    Url.create({
      url: 'http://myUrl/' + `test-${i}`,
      suffix
    })
  }
  console.log('done!')
})