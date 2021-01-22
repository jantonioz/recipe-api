const mongoose = require('mongoose')
const config = require('../config').database

mongoose.set('useCreateIndex', true)

async function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      config.connectionStr,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      err => {
        if (err) reject(err)
        resolve(mongoose.connection)
      }
    )
  })
}

module.exports = {
  getDb: connect
}
