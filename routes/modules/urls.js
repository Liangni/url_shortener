const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const Utility = require('../../utility')

const domain = `http://localhost:3000/urls/`

// 設定產生短網址
router.post('/', (req, res) => {
  let input = req.body.input.trim()
  let shortenedUrl = ''

  // 例外處理: 去除使用者輸入網址結尾的"/"，統一相同url儲存格式
  const lastIndex = input.length - 1
  if (input[lastIndex] === '/') {
    input = input.slice(0, -1)
  }

  return Url.findOne({ url: input, $options: "i" })
    .lean()
    .then(url => {

      // 例外處理: 輸入相同網址時，產生一樣的縮址
      if (url) {
        shortenedUrl = domain + url.suffix
      }

      // 產生短網址
      else {
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
router.get('/:suffix', (req, res) => {
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

module.exports = router