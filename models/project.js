const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectScheme = new Schema({
  behanceProjectId: Number,
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: 'user'},
  covers: {},
  description: String,
  stats: {}
})

const Project = mongoose.model('project', ProjectScheme)

module.exports = Project
