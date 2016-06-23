'use strict'

import test from 'ava'
import fetch from 'node-fetch'

import app from '../src/server/app'

const localhost = 'http://localhost:4000'

test('open index page', async (t) => {
  await fetch(`${localhost}/`)
    .then((res) => {
      t.is(res.status, 200)
    })
})
