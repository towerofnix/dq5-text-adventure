'use strict'

const Location = require('../../../Location')

module.exports = class FortunaFarNorthern extends Location {
  constructor() {
    super({
      name: 'Fortuna - Far-northern.js'
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      You're on the absolute northern-most street of Fortuna. It's a long
      and narrow street that stands against the outer walls of the town.
      There's one house, which has a well, a door to the fields outside,
      the northern entrance to an armour shop, and some stairs that lead down
      to the local prison.
    `)

    return this.game.prompt(
      'Go south, to the northern street',
      'Go to the armour shop stall',
      'Go to the prison',
      'Go to the field garden just outside of town',
      'Enter the house',
      'Look down the house\'s well',
      'Party chat'
    ).then(([ selection ]) => {

      // TODO: All of these!
      // hi future self, please remember this.

      if (selection === 'Go south, to the northern street')
        return this.game.goTo('Fortuna/Northern')

      else if (selection === 'Go to the armour stop stall')
        return this.game.goTo('Fortuna/Armour Shop (Stall)')

      else if (selection === 'Go to the prison')
        return this.game.goTo('Fortuna/Prison')

      else if (selection === 'Go to the field garden just outside of town')
        return this.game.goTo('Fortuna/Field Garden')

      else if (selection === 'Enter the house')
        return this.game.goTo('Fortuna/Far-northern House')

      else if (selection === 'Look down the house\'s well') {
        this.game.logParagraph(`
          You look down the well...
        `)

        return this.game.prompt('Continue..').then(() => {
          this.game.logParagraph(`
            But it's not of any particular interest.
          `)

          return this.continueToIndex()
        })
      }

      else if (selection === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
