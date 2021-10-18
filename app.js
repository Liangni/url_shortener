const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Url = require('./models/url')

const app = express()
const PORT = 3000
const domain = `http://localhost:${PORT}/`

mongoose.connect('mongodb://localhost/url-shortener-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () =>{
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

// 設定產生短網址
app.post('/urls', (req, res) =>{
  const input = req.body.input.trim()
  let shortenedUrl = ''
  return Url.findOne({ url:input, $options:"i" })
    .then( url => {
      // 例外處理: 輸入相同網址時，產生一樣的縮址
      if (url) {
        shortenedUrl = domain + url.suffix
      }
      // 產生短網址
      else  {
          const collection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz0123456789'
          let suffix = ''
          for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * collection.length)
            suffix += collection[randomIndex]
          } 
          Url.create({ url: input, suffix: suffix })
          shortenedUrl = domain + suffix
        }
    })
    .then(() => {
      res.render('index', { shortenedUrl })
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

