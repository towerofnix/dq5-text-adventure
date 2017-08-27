'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaArmourStoreBehindStand extends Location {
  constructor() {
    super({
      name: 'Fortuna - General Store (Armour - Behind Counter)',
      characters: {
        shopkeeper: new (class extends Character {
          talkedTo() {
            this.say(`
              Gosh, darn it, I'd give my right arm to be in that casino right
              now.
            `)

            return this.game.prompt('Continue..').then(() => {
              this.say(`
                Oh, what the heck! I'm sick o' this store! I'm goin'!
              `)

              this.game.logParagraph(`
                The shopkeeper jumps over the counter and leaves the room..
              `)

              loc.shopkeeperLeft = true

              this.game.partyChatInit([
                () => {
                  this.game.players.parry.say(`
                    Yikes! He just left! He must've really wanted to go and
                    gamble, mustn't he?
                  `)
                },

                () => {
                  this.game.players.madchen.say(`
                    Um... That means we can't do any shopping now.
                  `)
                }
              ])
            })
          }
        })
      }
    })

    const loc = this
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      Whoops! You've ended up behind the counter where people buy things from
      the armour store.
      ${this.shopkeeperLeft ? '' : `
         The shopkeeper is there, waiting for any visitors to buy a suit of
         armour, a helmet, or some other protective piece of equipment. It
         doesn't look to be a very busy day..
      `}
    `)

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

    opts.push('Go upstairs', 'Party chat')

    return this.game.prompt(...opts).then(([ selected ]) => {

      if (selected === 'Leave the store')
        return this.game.goTo('Fortuna/Eastern')

      else if (selected === 'Talk to the shopkeeper')
        return this.game.talkTo(this.characters.shopkeeper)
          .then(() => this.continueToIndex())

      else if (selected === 'Go upstairs')
        return this.game.goTo('Fortuna/General Store (Armour - Level 2)')

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
