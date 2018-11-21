var express = require('express')
var router = express.Router()
const axios = require('axios')
const User = require('../models/user')

router.get('/', async (req, res) => {
  const users = await User.find({})
    .lean()
    .exec()

  res.json(users)
})

router.get('/seed', async (req, res) => {
  const {data} = await axios.get(
    'https://api.behance.net/v2/creativestofollow?client_id=aiLg1vziBlZUpaQIS74ECWB3wJqwMlmD'
  )

  const dataToInsert = data.creatives_to_follow.map(item => ({
    behanceId: item.id,
    display_name: item.display_name,
    images: item.images,
    stats: item.stats,
    occupation: item.occupation
  }))

  await User.insertMany(dataToInsert)

  res.json({message: 'Data inserted'})
})

module.exports = router
