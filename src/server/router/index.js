'use strict'

const router = require('koa-router')()

const User = require('../model/user')

router.post('/reg', (ctx) => {
  let user = new User()
})

router.get('/', (ctx) => {
  ctx.state = {
    title: 'hi koa',
    user: {}
  }

  let user = new User({
    username: 'Maopy',
    password: '123456'
  })
  user.save((err, res) => {
    if (err) {
      return console.error(err)
    }
    console.log(`save: ${res}`)
  })

  User.find((err, users) => {
    if (err) {
      return console.error(err)
    }
    console.log(`find: ${users}`)
  })

  return ctx.render('index')
})

router.get('/login', (ctx) => {
  ctx.state = {
    title: 'Login'
  }

  return ctx.render('user/login')
})

router.get('/reg', (ctx) => {
  ctx.state = {
    title: 'Register'
  }

  return ctx.render('user/reg')
})

module.exports = router
