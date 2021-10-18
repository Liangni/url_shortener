const mongoose = require('mongoose')
const Url = require('../url')
const Utility = require('../../utility')

mongoose.connect('mongodb://localhost/url-shortener-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoddb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    const suffix = Utility.suffixGenerator()
    Url.create({
      url: 'http://myUrl/' + `test-${i}`,
      suffix
    })
  }
  console.log('done!')
})