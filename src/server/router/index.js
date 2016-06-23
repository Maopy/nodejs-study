'use strict'

const router = require('koa-router')()

const User = require('../model/user')

router.post('/reg', (ctx) => {
  let user = new User(ctx.request.body)

  return user.saveAsync()
    .then((res) => {
      ctx.body = {
        status: 0,
        data: res
      }
    })
    .catch((err) => {
      if (~~err.code === 11000) {
        ctx.body = {
          status: 100,
          errorInfo: '用户已存在'
        }
      }
    })
})

router.get('/', (ctx) => {
  ctx.state = {
    title: 'hi koa',
    user: {}
  }

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
