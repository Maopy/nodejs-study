'use strict'

const router = require('koa-router')()

const User = require('../model/user')

router.post('/login', (ctx) => {
  let loginUser = ctx.request.body

  return User.findOneAsync({
    username: loginUser.username
  })
    .then((user) => {
      if (user) {
        return user.comparePasswordAsync(loginUser.password)
          .then((isMatch) => {
            console.log(loginUser.password, isMatch)
            if (isMatch) {
              ctx.body = {
                status: 0,
                data: user
              }
            } else {
              ctx.body = {
                status: 101,
                errorInfo: 'wrong password'
              }
            }
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        ctx.body = {
          status: 102,
          errorInfo: 'user not exist'
        }
      }
    })
    .catch((err) => {
      console.error(err)
    })
})

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
          errorInfo: 'user already exist'
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
