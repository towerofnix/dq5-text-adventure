'use strict'

const Location = require('../../../Location')

module.exports = class FortunaItemsStore extends Location {
  constructor() {
    super({
      name: 'Fortuna - General Store (Items)',
      characters: {
        shopkeeper: new (require('../../characters/npc/Shopkeeper'))
      }
    })

    this.characters.shopkeeper.itemNames = [
      'Medicinal herb', 'Antidotal herb', 'Holy water', 'Chimaera wing',
      'Moonwort bulb', 'Musk'
    ]

    this.characters.shopkeeper.dialogs.welcome = () => (
      'Welcome to the item shop. How can I serve you?'
    )
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The item shop makes up half of the general store building - it's walled
      off from the other side of the house.
    `)

    this.game.logParagraph(`
      A lady is standing behind a counter, waiting for customers. Also behind
      the counter are a few pouches of various items that must be being sold
      here. A table for two is set at the side of the room, and some plants
      liven up the shop a bit.
    `)

    return this.game.prompt(
      'Leave the store',
      'Talk to the shopkeeper',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the store')
        return this.game.goTo('Fortuna/Eastern')

      else if (selected === 'Talk to the shopkeeper')
        return this.game.talkTo(this.characters.shopkeeper)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
