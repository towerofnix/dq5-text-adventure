'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaArmourStoreStall extends Location {
  constructor() {
    super({
      name: 'Fortuna - Armour Store (Stall)',
      characters: {
        guy: new (class extends Character {
          talkedTo() {
            this.say(`
              Welcome to the armour shop! How can I help you?
            `)

            this.say(`
              Oh, shops haven't been made to work yet? That's a bit sad.
            `)

            loc.customer = true
          }
        })
      }
    })

    const loc = this
  }

  goneTo() {
    this.game.partyChatInit([
      () => {
        this.game.players.sancho.say(`
          I no like thees eshop. You no have to buy anytheeng here, friend.
        `)
      },

      () => {
        this.game.players.madchen.say(`
          That shopkeeper's a bit scary. He stares too much!
        `)
      }
    ])

    this.customer = false
  }

  index() {
    this.game.clearConsole()

    this.characters.guy.say(`
      Welcome!
    `)

    this.game.logParagraph(`
      As you enter the simple armour store stall, the owner greets you.
      Clearly he's anticipating a purchase!
    `)

    return this.game.prompt(
      'Exit towards south',
      'Exit towards north',
      'Buy something from the armour store',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Exit towards south')
        return this.checkBoughtOnExit()
          .then(() => this.game.goTo('Fortuna/Northern'))

      else if (selected === 'Exit towards north')
        return this.checkBoughtOnExit()
          .then(() => this.game.goTo('Fortuna/Far-northern'))

      else if (selected === 'Buy something from the armour store')
        return this.game.talkTo(this.characters.guy)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }

  checkBoughtOnExit() {
    if (!this.customer) {
      this.game.logParagraph(`
        But as you're about to leave, the store owner calls out to you!
      `)

      this.characters.guy.say(`
        Ya can read, right? Like the sign says, customers only through
        here.
      `)

      return this.game.prompt('Continue..')
        .then(() => this.game.talkTo(this.characters.guy))
        .then(() => this.game.prompt('Continue..'))
    } else {
      return Promise.resolve()
    }
  }
}
