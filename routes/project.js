var express = require('express')
var router = express.Router()
const User = require('../models/user')
const Project = require('../models/project')
const axios = require('axios')

router.get('/seed', async (req, res) => {
  const behanceId = req.query.id
  const users = await User.find({behanceId})
    .lean()
    .exec()

  const usersProject = users.map(user => {
    return axios.get(
      `https://api.behance.net/v2/users/${user.behanceId}/projects?client_id=aiLg1vziBlZUpaQIS74ECWB3wJqwMlmD`
    )
  })

  const allProject = await Promise.all(usersProject)
  const test = allProject.map(project => project.data.projects)[0].slice(0, 6)

  const coba = test.map(project => {
    return axios.get(`http://www.behance.net/v2/projects/${project.id}?api_key=aiLg1vziBlZUpaQIS74ECWB3wJqwMlmD`)
  })

  const exec1 = await Promise.all(coba)
  const exec = exec1.map(response => response.data.project.description)

  const combine = test.map((item, index) => ({...item, description: exec[index], behanceProjectId: behanceId}))

  await Project.insertMany(combine)
  res.json({status: 'ok'})
})

router.get('/:id', async (req, res) => {
  const projects = await Project.find({behanceProjectId: req.params.id}).exec()
  const user = await User.findOne({behanceId: req.params.id}).exec()

  res.json({projects, user})
})

module.exports = router
