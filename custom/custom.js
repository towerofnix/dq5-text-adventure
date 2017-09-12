'use strict'

const Game = require('../Game')

module.exports = class CustomGameClass extends Game {
  constructor() {
    super({
      players: {
        hero: new (require('./characters/Hero'))
      }
    })
  }

  start() {
    return this.load()
  }
}
