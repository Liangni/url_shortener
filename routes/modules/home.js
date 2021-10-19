const express = require('express')
const router = express.Router()

// 設定首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router