const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const Utility = require('./utility')

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
  let input = req.body.input.trim()

  let shortenedUrl = ''
  return Url.findOne({ url:input, $options:"i" })
    .lean()
    .then( url => {
      
      // 例外處理: 輸入相同網址時，產生一樣的縮址
      if (url) {
        shortenedUrl = domain + url.suffix
      }
      
      // 產生短網址
      else  {
          const suffix = Utility.suffixGenerator()
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

// 設定轉址路由
app.get('/:suffix', (req, res) => {
  const suffix = req.params.suffix
  return Url.findOne({ suffix })
    .lean()
    .then(url => {
      res.redirect(url.url)
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

