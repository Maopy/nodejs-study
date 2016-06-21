'use strict'

const router = require('koa-router')()

router.get('/', (ctx) => {
  ctx.state = {
    title: 'hi koa'
  }

  return ctx.render('index')
})

router.get('/login', (ctx) => {
  ctx.state = {
    title: 'Login'
  }

  return ctx.render('login')
})

module.exports = router
