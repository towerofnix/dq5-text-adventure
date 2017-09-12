'use strict'

const Location = require('../../../Location')

module.exports = class TheOldCuriosityShop extends Location {
  constructor() {
    super({
      name: 'Fortuna - The Old Curiosity Shop',
    })
  }

  goneTo() {
    this.firstIndex = true
  }

  index() {
    return Promise.resolve().then(() => {
      if (this.firstIndex) {
        this.game.logParagraph(`
          You find a small house, and decide to go through..
        `)

        this.firstIndex = false

        return this.game.prompt('Continue')
      }
    }).then(() => {
      this.game.clearConsole()

      this.game.logParagraph(`
        The house you're in has only one room, but it's packed with all
        kinds of things!
      `)

      this.game.logParagraph(`
        The floor is covered with a soft blue carpet that's patterned with
        gold lace. In the middle of the room is an empty table, surrounded
        by two lit torch stands, each nearly as tall as an average grown
        man.
      `)

      this.game.logParagraph(`
        Carefully placed along boxes and shelves are various knick-knacks
        (one of which is a huge globe - a map of the entire known world!).
        Mounted on a wall is the head of some kind of large beast. It'd
        probably be best not to disturb anything.
      `)

      // TODO: this should be different in the night
      this.game.logParagraph(`
        Despite a chair being sat behind the table, nobody's home right
        now...
      `)

      return this.game.prompt(
        'Head back to the town',
        'Party chat'
      )
    }).then(([ selected ]) => {

      if (selected === 'Head back to the town')
        return this.game.goTo('Fortuna/Western')

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
