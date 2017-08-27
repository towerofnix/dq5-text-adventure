'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoTnT extends Location {
  constructor() {
    super({
      name: 'Fortuna - Casino T\'n\'T',
      characters: {
        tntManager: new (class extends Character {
          talkedTo() {
            this.say(`
              Welcome to the T'n'T board!
            `)

            this.say(`
              One round of T'n'T will cost you one T'n'T tick-- Oh! I beg
              your pardon!
            `)

            // TODO: T'n'T
            this.say(`
              You don't seem to have a graphical screen to play T'n'T on..
              Maybe some other time?
            `)
          }
        }),

        knight: new (class extends Character {
          talkedTo() {
            this.say(`
              Hmm... Yes, I better go this way around. No, perhaps that way
              around would be better after all...
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                // TODO: si accent
                this.game.players.sancho.say(`
                  Thees ees a good idea! First you look at the board from the
                  floor, then you take the challenge, si?
                `)
              },

              () => {
                this.game.players.madchen.say(`
                  I've already figured out the best way around. Pretty
                  clever, don't you think, Dad?
                `)
              }
            ])
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
          Hmm... Ees no eso big, thees board, eh?
        `)
      },

      () => {
        this.game.players.madchen.say(`
          I really like T'n'T. I always manage to beat Parry.
        `)
      },

      () => {
        this.game.players.parry.say(`
          Yay! It's Treasures and Trapdoors!
        `)
      }
    ])
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      It's a T'n'T board!
    `)

    this.game.logParagraph(`
      Overviewing one of the routes is a knight. He looks quite busy.
    `)

    this.game.logParagraph(`
      Down some stairs to the side is the T'n'T board pit. (Where you'd end
      up if you fell down a trapdoor, of course.)
    `)

    return this.game.prompt(
      'Head back upstairs',
      'Try a game of T\'n\'T',
      'Talk to the knight',
      'Go into the pit',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head back upstairs')
        return this.game.goTo('Fortuna/Casino Western')

      else if (selected === 'Try a game of T\'n\'T')
        return this.game.talkTo(this.characters.tntManager)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the knight')
        return this.game.talkTo(this.characters.knight)
          .then(() => this.continueToIndex())

      else if (selected === 'Go into the pit')
        return this.game.goTo('Fortuna/Casino TnT Pit')

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
