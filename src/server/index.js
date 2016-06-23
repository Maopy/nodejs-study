'use strict'

// const open = require('open')
const app = require('./app')
const port = 4000

app.listen(port, '0.0.0.0', (err) => {
  if (!err) {
    console.log(`Listening at http://0.0.0.0:${port}`)
    // open(`http://localhost:${port}`)
  }
})
