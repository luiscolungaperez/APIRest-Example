const mongoose = require('mongoose')

const Schema = mongoose.Schema

const myTest = new Schema({
  name: String,
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('myTest', myTest)
