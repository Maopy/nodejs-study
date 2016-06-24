'use strict'

import test from 'ava'
import request from 'supertest'

const superkoa = (appPath) => {
  let _path = appPath !== undefined ? appPath : '../../app.js'
  let koa = require(_path)
  return request(koa.listen())
}

test('reg success', async (t) => {
  let regUser = {
    username: 'Maopy',
    password: '123456'
  }
  let res = await superkoa('../src/server/app.js')
    .post('/reg')
    .send(regUser)
  let ret = res.body
  t.is(ret.status, 0)
  t.true('username' in ret.data)
  t.true('password' in ret.data)
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
