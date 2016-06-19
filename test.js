'use strict'

import test from 'ava'
var exec = require('child_process').exec

test('my test', t => {
  t.is(3, 3)
})

test.cb('exec', t => {
    exec('node index.js', function (err, out, str) {
        t.ifError(err)
        t.regex(out, /Maopy/)
        t.end()
    })
})
