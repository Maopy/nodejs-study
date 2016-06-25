'use strict'

const path = require('path')
const Koa = require('koa')
const statics = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')

const router = require('./router/')

const app = new Koa()
const viewPath = path.join(__dirname, '../../', 'src/client/view')
const staticPath = path.join(__dirname, '../../', 'src/client/public')

app.use(bodyParser())

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
