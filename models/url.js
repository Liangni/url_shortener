const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema ({
  url: {
    type: String,
    required: true
  },
  suffix: {
    type: String,
    requried: true
  }
})

module.exports = mongoose.model('Url', urlSchema)