const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
  try {
    const {data} = await axios.get(
      `https://www.behance.net/v2/collections?q=${req.query.q}&time=month&api_key=aiLg1vziBlZUpaQIS74ECWB3wJqwMlmD`
    )

    res.status(200).json(data.collections)
  } catch (err) {
    console.log(err)
    res.status(500).json({err})
  }
})

module.exports = router
