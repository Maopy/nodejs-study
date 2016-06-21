'use strict'

const router = require('koa-router')()

router.get('/', (ctx) => {
  ctx.state = {
    title: 'hi koa',
    user: {}
  }

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
