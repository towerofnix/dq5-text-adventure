'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaArmourStoreLevel2 extends Location {
  constructor() {
    super({
      name: 'Fortuna - General Store (Armour - Level 2)',
      characters: {
        shopkeeperWife: new (class extends Character {
          talkedTo() {
            this.say(`
              Oh, why did I marry such a loser? He keeps leavin' the store
              open and makin' a beeline for the casino. I don't know! Men!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  Do you think I'll end up like that one day? Uh-oh!
                `)
              }
            ])
          }
        })
      }
    })

    const loc = this
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      Upstairs is clearly where the armour store's owner lives, along with
      somebody who looks to be his wife (she's making a meal now!).
    `)

    this.game.logParagraph(`
      This floor consists of two rooms - a kitchen/dining-room and a bedroom.
      A long wooden table is standing in the kitchen, with two chairs sat by
      it. There's a stove being used right now, and a sink full of dishes.
    `)

    this.game.logParagraph(`
      The bedroom is large enough to comfortably fit two people, with two
      beds, two dressers set by one of the beds, and a clothed table that has
      two chairs set on opposite sides of it. There's some plants placed at
      one end of the room that lighten up the atmosphere, together with some
      open windows in the walls.
    `)

    return this.game.prompt(
      'Head back downstairs',
      'Talk to the lady',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head back downstairs')
        return this.game.goTo(
          'Fortuna - General Store (Armour - Behind Counter)'
        )

      else if (selected === 'Talk to the lady')
        return this.game.talkTo(this.characters.shopkeeperWife)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
