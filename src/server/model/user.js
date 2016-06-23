'use strict'

let Promise = require('bluebird')

let mongodb = require('./mongodb')

let UserSchema = mongodb.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

let User = mongodb.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User
