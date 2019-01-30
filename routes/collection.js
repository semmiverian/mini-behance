const express = require('express')
const router = express.Router()
const Collection = require('../models/collection')
const axios = require('axios')

router.get('/', async (req, res) => {
  try {
    const collection = await Collection.findOne({query: req.query.q}).exec()
    let mapped = collection ? collection.data : []

    if (!collection) {
      const {data} = await axios.get(
        `https://www.behance.net/v2/collections?q=${req.query.q}&time=month&api_key=aiLg1vziBlZUpaQIS74ECWB3wJqwMlmD`
      )

      mapped = data.collections
        .filter(item => item.latest_projects.length !== 0)
        .map(item => {
          const [project] = item.latest_projects
          console.log(project)
          return {
            covers: project.covers,
            stats: project.stats,
            name: project.name,
            description: project.slug
          }
        })

      await Collection.create({query: req.query.q, data: mapped})
    }
    res.status(200).json(mapped)
  } catch (err) {
    console.log(err)
    res.status(500).json({err})
  }
})

module.exports = router
