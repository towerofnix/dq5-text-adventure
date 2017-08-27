'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaLockedPrisonCell extends Location {
  constructor() {
    super({
      name: 'Fortuna - Locked Prison Cell',
      characters: {
        oldPrisoner: new (class extends Character {
          talkedTo() {
            this.say(`
              I've been locked up in 'ere for ten years now. Yer the first
              bloke who's bothered to say anyfin' to me in all that time. I
              ain't got nuffin' to give ye, but I can tell ya somefin'
              that'll keep ya out o' trouble.
            `)

            this.say(`
              The slot machine that's second from the left in the back row o'
              the casino's the one wot pays the most.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  Do you think that's true?
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  Ees only helpful eef they no have changed the places of the
                  eslot machines. But ees probably okay.
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
    this.firstIndex = true
  }

  index() {
    return Promise.resolve().then(() => {
      if (this.firstIndex) {
        this.game.logParagraph(`
          You unlock the door, and enter the room..
        `)

        this.firstIndex = false

        return this.game.prompt('Continue..')
      }
    }).then(() => {
      this.game.clearConsole()

      this.game.logParagraph(`
        This prison cell is completely empty - save for a torch stand and a
        prisoner. The prisoner is a middle-aged man who looks to have been
        stuck in this cell for longer than anyone could remember if they
        tried.
      `)

      return this.game.prompt(
        'Leave the cell',
        'Talk to the old prisoner',
        'Party chat'
      ).then(([ selected ]) => {

        if (selected === 'Leave the cell')
          return this.game.goTo('Fortuna/Prison')

        else if (selected === 'Talk to the old prisoner')
          return this.game.talkTo(this.characters.oldPrisoner)
            .then(() => this.continueToIndex())

        else if (selected === 'Party chat')
          return this.game.partyChat()
            .then(() => this.continueToIndex())

      })
    })
  }
}
