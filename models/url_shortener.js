const mongoose = requrie('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema ({
  url: {
    type: String,
    required: true
  },
  suffix: {
    type: String,
    trquried: true
  }
})

module.exports = mongoose.model('Url', urlSchema)