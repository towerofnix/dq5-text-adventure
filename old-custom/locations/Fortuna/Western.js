'use strict'

const Location = require('../../../Location')

module.exports = class FortunaWestern extends Location {
  constructor() {
    super({
      name: 'Fortuna - Western'
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The western section of Fortuna is somewhat a maze of walls with helpful
      places scattered here and there. To your north is the bank, and to your
      south is a set of stairs that leads down into the monstergarten.
    `)

    this.game.logParagraph(`
      There's two twists of walls behind the bank that might lead places.
    `)

    return this.game.prompt(
      'Go back to the town centre',
      'Go to the monstergarten',
      'Go to the bank',
      'Go through the left complex of walls',
      'Go through the right complex of walls',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Go back to the town centre')
        return this.game.goTo('Fortuna')

      else if (selected === 'Go to the monstergarten')
        return this.game.goTo('Fortuna/Monstergarten')

      else if (selected === 'Go to the bank')
        return this.game.goTo('Fortuna/Bank')

      else if (selected === 'Go through the left complex of walls')
        return this.game.goTo('Fortuna/Western Walls')

      else if (selected === 'Go through the right complex of walls')
        return this.game.goTo('Fortuna/Northern')

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
