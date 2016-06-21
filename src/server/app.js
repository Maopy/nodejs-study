'use strict'

const path = require('path')
const Koa = require('koa')
const statics = require('koa-static')
const views = require('koa-views')

const router = require('./router/')

const app = new Koa()
const viewPath = path.join(path.resolve(), 'src/client/view')
const staticPath = path.join(path.resolve(), 'src/client/public')

app.use(views(viewPath, {
  extension: 'html',
  map: {
    html: 'ejs'
  }
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(statics(staticPath, {
  maxage: 0
}))

module.exports = app
