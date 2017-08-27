'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoBar extends Location {
  constructor() {
    super({
      name: 'Fortuna - Casino Bar',
      characters: {
        strongMan: new (class extends Character {
          talkedTo() {
            this.say(`
              How's it goin', pal? Are ya winnin'?
            `)

            return this.game.promptYesNo().then(choice => {
              if (choice) {
                this.say(`
                  Yeah? Go for it, then! You gotta go for it when you're on a
                  winnin' streak!
                `)

                this.game.removePartyChatScene(loc.talkScene)
                this.game.partyChatInit(loc.talkScene = [
                  () => {
                    this.game.players.parry.say(`
                      Hear that? He says we should go for it!
                    `)
                  }
                ])
              } else {
                this.say(`
                  No? Don't worry, it'll come. Your luck's gotta change
                  sometime, right?
                `)

                this.game.removePartyChatScene(loc.talkScene)
                this.game.partyChatInit(loc.talkScene = [
                  () => {
                    this.game.players.madchen.say(`
                      If we're not doing very well, can't we just leave? My
                      ears are starting to hurt.
                    `)
                  },

                  () => {
                    this.game.players.sancho.say(`
                      Esometimes you must just estop. Otherwise you gonna be
                      a desperado, you know.
                    `)
                  }
                ])
              }
            })
          }
        }),

        standardMan: new (class extends Character {
          talkedTo() {
            this.say(`
              Folks are talkin' about this darkness that's gonna destroy the
              world.
            `)

            this.say(`
              But we've all gotta die sometimes, right? Gotta enjoy life
              while you can, I say. Let the good times roll!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  Are we all really going to die? You and Mum and me and all
                  of us? I don't like it!
                `)
              },

              () => {
                this.game.players.parry.say(`
                  If I'm going to die, then I may as well get in whatever
                  enjoyment I can now, right, Dad?
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  Ees no worrying for you? These bad gossips, we hear them
                  everywhere.
                `)
              }
            ])
          }
        }),

        elderMan: new (class extends Character {
          talkedTo() {
            this.say(`
              There's people from all walks o' life in this here town. The
              good, the bad and the ugly. And it looks like you've had your
              fair share of suffering to me.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  I don't really like casinos. They're so noisy.
                `)
              },

              () => {
                this.game.players.parry.say(`
                  How come he says you can see all walks of life here? I
                  can't see anything special. I don't get it!
                `)
              }
            ])
          }
        }),

        waiter: new (class extends Character {
          talkedTo() {
            this.say(`
              Have ya heard about the legendary hero? Everyone's speculatin'
              about whether he's gonna show or not. I've got a thousand G
              down that says he does!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.sancho.say(`
                  Ees like a game for thees señor, eh? Because he doesn't
                  know anytheeng. Maybe he's lucky...
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
      The casino bar is a fairly standard bar - some buckets of who knows
      what drink, a cabinet for glasses and bottles, and some people sat
      around the table.
    `)

    this.game.logParagraph(`
      There's a relatively muscular man, a standard man, and an elder man,
      each having their own drinks. The waiter is busy, trying (successfully!)
      to keep up with everyone.
    `)

    return this.game.prompt(
      'Leave the bar',
      'Talk to the strong man',
      'Talk to the standard man',
      'Talk to the elder man',
      'Talk to the waiter',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the bar')
        return this.game.goTo('Fortuna/Casino Eastern')

      else if (selected === 'Talk to the strong man')
        return this.game.talkTo(this.characters.strongMan)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the standard man')
        return this.game.talkTo(this.characters.standardMan)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the elder man')
        return this.game.talkTo(this.characters.elderMan)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the waiter')
        return this.game.talkTo(this.characters.waiter)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
