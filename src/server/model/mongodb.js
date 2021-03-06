'use strict'

let mongoose = require('mongoose')

const env = process.env.NODE_ENV || 'production'

if (env === 'test') {
  mongoose.connect('mongodb://127.0.0.1:27017/test')
} else {
  mongoose.connect('mongodb://127.0.0.1:27017/nodejs_study')
}

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('we\'re connected')
})

module.exports = mongoose
