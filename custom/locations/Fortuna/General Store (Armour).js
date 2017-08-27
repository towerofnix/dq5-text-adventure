'use strict'

const Location = require('../../../Location')

module.exports = class FortunaArmourStore extends Location {
  constructor() {
    super({
      name: 'Fortuna - General Store (Armour)',
      characters: {
        shopkeeper: new (require('../../characters/npc/Shopkeeper'))
      }
    })

    this.characters.shopkeeper.itemNames = [
      'Leather kilt', 'Scale shield', 'Bronze shield', 'Pointy hat',
      'Hardwood headwear', 'Rags'
    ]

    this.characters.shopkeeper.dialogs.welcome = () => `
      Welcome to the armour shop. How can I serve you?
    `

    this.characters.shopkeeper.dialogs.anythingElse = () => `
      Is there anything else I can help you with?
    `

    this.characters.shopkeeper.dialogs.buyChosen = () => `
      A leather kilt? Very well. Who's going to carry the goods?
    `
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The armour shop is a fairly non-descript room that makes up half of the
      general store.
    `)

    if (this.shopkeeperLeft) {
      this.game.logParagraph(`
        There isn't a shopkeeper to be seen..
      `)
    } else {
      this.game.logParagraph(`
        The shopkeeper, who appears to be quite bored and restless, is
        (im)patiently waiting for a customer to arrive.
      `)
    }

    this.game.logParagraph(`
      There's two suited stands of armour and some shields lined along the
      wall. A staircase ${
        this.shopkeeperLeft
        ? 'where the owner of the place was'
        : 'behind the owner of the place'
      } goes up onto the second floor.
    `)

    const opts = ['Leave the store']

    if (!this.shopkeeperLeft) {
      opts.push('Talk to the shopkeeper')
    }

    opts.push('Party chat')

    return this.game.prompt(...opts).then(([ selected ]) => {

      if (selected === 'Leave the store')
        return this.game.goTo('Fortuna/Northern')

      else if (selected === 'Talk to the shopkeeper')
        return this.game.talkTo(this.characters.shopkeeper)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }

  get shopkeeperLeft() {
    const loc = this.game.getLocation(
      'Fortuna - General Store (Armour - Behind Counter)'
    )

    return loc.shopkeeperLeft
  }
}
