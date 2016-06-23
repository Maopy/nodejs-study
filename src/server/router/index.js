'use strict'

const router = require('koa-router')()

const User = require('../model/user')

router.post('/reg', (ctx) => {
  let user = new User(ctx.body)

  try {
    let res = user.saveAsync()
    console.log(`save: ${res}`)
  } catch (err) {
    console.error(err)
  }
})

router.get('/', (ctx) => {
  ctx.state = {
    title: 'hi koa',
    user: {}
  }

  // User.find((err, users) => {
  //   if (err) {
  //     return console.error(err)
  //   }
  //   console.log(`find: ${users}`)
  // })

  User.findAsync()
    .then((users) => {
      console.log(`find: ${users}`)
    })
    .catch((err) => {
      console.error(err)
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
