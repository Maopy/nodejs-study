'use strict'

import test from 'ava'
import request from 'supertest'

import mongodb from '../src/server/model/mongodb'

const superkoa = (appPath) => {
  let _path = appPath !== undefined ? appPath : '../../app.js'
  let koa = require(_path)
  return request(koa.listen())
}
const fetch = superkoa('../src/server/app.js')

test.cb.after.always('clean up', (t) => {
  mongodb.connection.db.dropDatabase((err, res) => {
    t.end()
  })
})

test('reg success', async (t) => {
  let regUser = {
    username: 'Maopy',
    password: '123456'
  }
  let res = await fetch.post('/reg')
    .send(regUser)
  let ret = res.body
  t.is(ret.status, 0)
  t.true('username' in ret.data)
  t.true('password' in ret.data)
})

test('reg already exist', async (t) => {
  let regUser = {
    username: 'Maopy',
    password: '123456'
  }
  let res = await fetch.post('/reg')
    .send(regUser)
  let ret = res.body
  t.is(ret.status, 100)
})

test('login success', async (t) => {
  let loginUser = {
    username: 'Maopy',
    password: '123456'
  }
  let res = await fetch.post('/login')
    .send(loginUser)
  let ret = res.body
  t.is(ret.status, 0)
  t.true('username' in ret.data)
  t.true('password' in ret.data)
})

test('login wrong password', async (t) => {
  let loginUser = {
    username: 'Maopy',
    password: '1234567'
  }
  let res = await fetch.post('/login')
    .send(loginUser)
  let ret = res.body
  t.is(ret.status, 101)
})

test('login user not found', async (t) => {
  let loginUser = {
    username: 'Maopy2',
    password: '123456'
  }
  let res = await fetch.post('/login')
    .send(loginUser)
  let ret = res.body
  t.is(ret.status, 102)
})

test('render index', async (t) => {
  let res = await fetch.get('/')
  t.is(res.status, 200)
})

test('render login', async (t) => {
  let res = await fetch.get('/login')
  t.is(res.status, 200)
})

// test('login success', async (t) => {
//   let loginUser = {
//     username: 'Maopy2',
//     password: '123456'
//   }
//   return await fetch(`${localhost}/login`, {
//     method: 'POST',
//     body: loginUser 
//   })
//     .then((res) => {
//       t.true(res.ok)
//       t.is(res.status, 200)
//       return res.json()
//     })
//     .then((ret) => {
//       console.log(ret, 1)
//       t.is(ret.status, 0)
//       t.true('username' in ret.data)
//       t.true('password' in ret.data)
//     })
//     .then(() => {
//       exit(1)
//     })
// })
