'use strict'

const PlayerCharacter = require('../../PlayerCharacter')

module.exports = class Sancho extends PlayerCharacter {
  constructor() {
    super({
      name: 'Sancho'
    })
  }

  talkedTo() {
    this.say(`
      The developer of this couldn\'t make a good imitation of my accent.
      Oops.
    `)
  }
}
