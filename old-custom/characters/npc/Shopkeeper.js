'use strict'

const Character = require('../../../Character')

module.exports = class Shopkeeper extends Character {
  constructor() {
    super()

    this.dialogs = {

      welcome: () => 'Welcome to the general shop. How can I serve you?',
      anythingElse: () => 'Can I help you with anything else?',
      comeAgain: () => 'Come again any time!',

      whatToBuy: () => 'What would you like to buy?',
      buyChosen: item => `
        ${item.singular}? Your custom's most appreciated. Who's going to
        carry the goods?
      `,
      notEnoughMoney: () => `
        Sorry, but you don't seem to have enough money with you.
      `,
      giveItem: who => `Here you are, ${who.name}!`

    }
  }

  talkedTo() {
    return this.infiniteLop(this.dialogs.welcome())
  }

  infiniteLop(msg) {
    this.game.clearConsole()

    this.say(msg)

    return this.game.prompt('Leave', 'Buy', 'Review items')
      .then(([ selected ]) => {

        if (selected === 'Buy') {
          return this.buyInterface()
        } else if (selected === 'Review items') {
          return this.game.reviewItemsInterface()
            .then(() => this.infiniteLop(this.dialogs.anythingElse()))
        } else if (selected === 'Leave') {
          this.say(this.dialogs.comeAgain())
        }

      })
  }

  buyInterface() {
    this.say(this.dialogs.whatToBuy())

    const opts = this.getBuyOpts()
    return this.game.prompt(...opts, 'Never mind!')
      .then(([ selected, selectedIndex ]) => {
        if (selected === 'Never mind!') {
          return
        }

        const itemName = this.itemNames[selectedIndex]
        const item = this.game.getItem(itemName)

        this.selectedItem = item

        if (item.price > this.game.gold) {
          this.say(this.dialogs.notEnoughMoney())

          return this.game.prompt('Continue..')
        } else {
          this.game.gold -= item.price

          return this.pickPlayerForPurchaseInterface()
        }
      }).then(() => {
        return this.infiniteLop(this.dialogs.anythingElse())
      })
  }

  pickPlayerForPurchaseInterface() {
    this.say(this.dialogs.buyChosen(this.selectedItem))

    return this.game.promptPlayer('Never mind!').then(selectedPlayer => {
      if (selectedPlayer === 'Never mind!') {
        return
      }

      this.say(this.dialogs.giveItem(selectedPlayer))

      selectedPlayer.getItem(this.selectedItem)

      return this.game.prompt('Continue..')
    })
  }

  getBuyOpts() {
    const items = this.getItems()

    let longestPriceLength = 0
    for (let item of items) {
      if (item.price.toString().length > longestPriceLength) {
        longestPriceLength = item.price.toString().length
      }
    }

    const opts = items.map(item => (
      item.name +
      ' '.repeat(
        30 - item.name.length + longestPriceLength
        - item.price.toString().length
      ) +
      item.price.toString()
    ))

    return opts
  }

  getItems() {
    return this.itemNames.map(name => this.game.getItem(name))
  }
}
