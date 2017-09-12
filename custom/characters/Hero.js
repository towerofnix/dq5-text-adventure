'use strict'

const PlayerCharacter = require('../../PlayerCharacter')

module.exports = class Hero extends PlayerCharacter {
  constructor() {
    super({
      name: 'Anonym'
    })
  }

  talkedTo() {
    this.say('..?')
  }
}
