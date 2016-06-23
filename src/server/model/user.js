'use strict'

const Promise = require('bluebird')
const bcrypt = require('bcrypt')

let mongodb = require('./mongodb')

const SALT_WORK_FACTOR = 10

let UserSchema = new mongodb.Schema({
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

UserSchema.pre('save', function (next) {
  let user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

let User = mongodb.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User
