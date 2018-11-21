const mongoose = require('mongoose')

module.exports = _ => {
  return mongoose.connect(
    'mongodb://semmi:semmi123@ds039007.mlab.com:39007/mini-behance',
    {useNewUrlParser: true}
  )
}
