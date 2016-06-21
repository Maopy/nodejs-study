'use strict'

const router = require('koa-router')()

router.get('/', (ctx) => {
  ctx.body = 'Hello koa'
})

module.exports = router
