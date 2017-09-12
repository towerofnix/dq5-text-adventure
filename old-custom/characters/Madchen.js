'use strict'

const PlayerCharacter = require('../../PlayerCharacter')

module.exports = class Madchen extends PlayerCharacter {
  constructor() {
    super({
      name: 'Madchen'
    })
  }

  talkedTo() {
    this.say('Well, this is a little awkward..')
  }
}
