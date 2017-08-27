'use strict'

const fs = require('fs')

process.on('unhandledRejection', error => {
  console.error(error)
  process.exit()
})

let willExit = false
process.stdin.on('data', data => {
  if (data.equals(Buffer.from([0x03]))) {
    if (willExit) {
      process.exit(0)
    } else {
      willExit = true
    }
  } else {
    willExit = false
  }
})

const Game = require('./Game')

const main = function() {
  const CustomGameClass = require('./custom/custom')
  const game = new CustomGameClass()
  game.start()
    .catch(e => {
      console.error(e)
    })
}

main()
