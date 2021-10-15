const mongoose = require('mongoose')
const Url = require('../url')

mongoose.connect('mongodb://localhost/url-shortener-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoddb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    const collection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz0123456789'
    let suffix = ''
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * collection.length)
      suffix += collection[randomIndex]
    }
    Url.create({
      url: 'http://myUrl/' + `test-${i}`,
      suffix
    })
  }
  console.log('done!')
})