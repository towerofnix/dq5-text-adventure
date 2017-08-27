'use strict'

const Location = require('../../../Location')

module.exports = class CoburgChurch extends Location {
  constructor() {
    super({
      name: 'Coburg - Church',
      characters: {
        priest: new (require('../../characters/npc/Priest'))
      }
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(``)

    return this.game.prompt(
      'Leave the church',
      'Talk to the priest',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the church')
        return this.game.goTo('Coburg')

      else if (selected === 'Talk to the priest')
        return this.game.talkTo(this.characters.priest)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
