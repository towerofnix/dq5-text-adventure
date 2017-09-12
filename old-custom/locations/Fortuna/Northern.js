'use strict'

const Location = require('../../../Location')

module.exports = class FortunaNorthern extends Location {
  constructor() {
    super({
      name: 'Fortuna - Northern'
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      You're on a long street behind the big casino. Along the street
      is a small open church, an armour shop stall (with a poster beside the
      entrance), an empty stall, and two generic houses.
    `)

    this.game.logParagraph(`
      The back (front?) entrance to the armour section of the general store
      is also along this street, near the eastern end.
    `)

    this.game.logParagraph(`
      At the very end of the street is a T-crossway that leads even farther
      north, and down to the eastern section of Fortuna.
    `)

    this.game.logParagraph(`
      On the opposite end of the street is a road that leads down to the
      western section.
    `)

    return this.game.prompt(
      'Go to the western section',
      'Go to the eastern section',
      'Go to the far-northern section',
      'Enter the church',
      'Go inside the armour store stall',
      'Go inside the general store\'s armour section',
      'Read the poster next to the armour store',
      'Look inside the first house',
      'Look inside the second house',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Go to the western section')
        return this.game.goTo('Fortuna/Western')

      else if (selected === 'Go to the eastern section')
        return this.game.goTo('Fortuna/Eastern')

      else if (selected === 'Go to the far-northern section')
        return this.game.goTo('Fortuna/Far-northern')

      else if (selected === 'Enter the church')
        return this.game.goTo('Fortuna/Church')

      else if (selected === 'Go inside the armour store stall')
        return this.game.goTo('Fortuna/Armour Store (Stall)')

      else if (
        selected === 'Go inside the general store\'s armour section'
      )
        return this.game.goTo('Fortuna/General Store (Armour)')

      else if (selected === 'Read the poster next to the armour store') {
        this.game.logParagraph(`
          'No passage without purchase! Store customers only, please!'
        `)
        return this.continueToIndex()
      }

      else if (selected === 'Look inside the first house')
        return this.game.goTo('Fortuna/Northern House 1')

      else if (selected === 'Look inside the second house')
        return this.game.goTo('Fortuna/Northern House 2')

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
