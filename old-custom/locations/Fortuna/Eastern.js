'use strict'

const Location = require('../../../Location')

module.exports = class FortunaEastern extends Location {
  constructor() {
    super({
      name: 'Fortuna - Eastern'
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The eastern section of Fortuna is nearly entirely filled with houses!
      There's a bar, a general store for both armour and items, and a house
      that a citizen of the town must live in. At one street interesection, a
      cat is relaxing on the warm stone ground.
    `)

    this.game.logParagraph(`
      This section of the town connects to the town centre and the northern
      street.
    `)

    return this.game.prompt(
      'Go to the town centre',
      'Go to the northern street',
      'Go to the general store\'s armour section',
      'Go to the general store\'s items section',
      'Go to the bar',
      'Go to the house',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Go to the town centre')
        return this.game.goTo('Fortuna')

      else if (selected === 'Go to the northern street')
        return this.game.goTo('Fortuna/Northern')

      else if (selected === 'Go to the general store\'s items section')
        return this.game.goTo('Fortuna/General Store (Items)')

      else if (selected === 'Go to the general store\'s armour section')
        return this.game.goTo(
          'Fortuna/General Store (Armour - Behind Counter)'
        )

      else if (selected === 'Go to the bar')
        return this.game.goTo('Fortuna/Bar')

      else if (selected === 'Go to the house')
        return this.game.goTo('Fortuna/Eastern House')

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
