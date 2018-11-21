const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  behanceId: Number,
  display_name: String,
  occupation: String,
  images: {},
  stats: {}
})

const User = mongoose.model('user', UserSchema)

module.exports = User
