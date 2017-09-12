'use strict'

const PlayerCharacter = require('../../PlayerCharacter')

module.exports = class Parry extends PlayerCharacter {
  constructor() {
    super({
      name: 'Parry'
    })
  }

  talkedTo() {
    this.say('Hey, how did you talk to me!?')
  }
}
