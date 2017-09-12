'use strict'

const Location = require('../../../Location')

module.exports = class CoburgItemShop extends Location {
  constructor() {
    super({
      name: 'Fortuna - Item Shop',
      characters: {
        shopkeeper: new (require('../../characters/npc/Shopkeeper'))
      }
    })

    this.characters.shopkeeper.itemNames = [
      'Medicinal herb', 'Antidotal herb', 'Holy water', 'Chimaera wing',
      'Shellmet', 'Fur hood'
    ]

    this.characters.shopkeeper.dialogs.welcome = () => (
      'Welcome to the item shop. How can I serve you?'
    )
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The item shop is a relatively standard one - items are stacked on
      shelves, a strange shell sits on a table, and the shopkeeper awaits
      your purchase.
    `)

    return this.game.prompt(
      'Leave the shop',
      'Talk to the shopkeeper',
      'Look at the helmet',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the shop')
        return this.game.goTo('Coburg')

      else if (selected === 'Talk to the shopkeeper')
        return this.game.talkTo(this.characters.shopkeeper)
          .then(() => this.continueToIndex())

      else if (selected === 'Look at the helmet') {
        this.game.logParagraph(`
          What a strange shell! It's shaped like the spiral ones you'd find on
          a beach if you were lucky, but it's a fair bit bigger than those
          ones. You suddenly find an urge to try putting it on your head, but
          as you grab it you shortly realize its surface is too rough to wear!
        `)
      }

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
