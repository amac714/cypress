const express = require('express')
const Promise = require('bluebird')
const debug = require('debug')('gateway')

const start = (send) => {
  const app = express()
  const server = require('http').createServer(app)
  const io = require('socket.io')(server)
  const listenAsync = Promise.promisify(server.listen, { context: server })

  debug('starting server with config')
  // @ts-ignore
  io.set('transports', ['websocket'])

  io.on('connection', function (socket) {
    debug('socket connected')

    socket.on('command', (payload, cb) => {
      debug('got command', payload)
      return send(payload)
      .then((resp) => cb({ response: resp }))
      .catch((err) => {
        debug('command error', err)
        cb({ error: 'error' }) //errors.clone(err) }))
      })
    })
  })

  // @ts-ignore
  return listenAsync(3000)
}

module.exports = {
  start,
}
