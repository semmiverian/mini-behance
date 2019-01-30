const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
  query: String,
  data: Array
})

const collection = mongoose.model('collection', collectionSchema)

module.exports = collection
