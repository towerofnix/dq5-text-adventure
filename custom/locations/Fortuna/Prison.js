'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaPrison extends Location {
  constructor() {
    super({
      name: 'Fortuna - Prison',
      characters: {
        guard: new (class extends Character {
          talkedTo() {
            this.say(`
              This is the town prison. If you wanna talk to the inmates,
              better do it through the bars.
            `)
          }
        }),

        prisoner: new (class extends Character {
          talkedTo() {
            this.say(`
              How long are they gonna keep me locked up in here, huh?
            `)

            this.game.logParagraph(`
              Unlock the door?
            `)

            return this.game.promptYesNo().then(choice => {
              if (choice) {
                this.say(`
                  What? You're lettin' me out? Gee, thanks, pal!
                `)

                this.game.logParagraph(`
                  The prisoner leaves the jail cell. Suddenly..
                `)

                return this.game.prompt('Continue..').then(() => {
                  this.say(`
                    Oh, yeah. Check out that stool over there. Think of it as
                    a mini reward for helpin' me out.
                  `)

                  this.game.logParagraph(`
                    He quickly leaves the prison.
                  `)

                  loc.prisonerGone = true

                  this.game.partyChatInit([
                    () => {
                      this.game.players.sancho.say(`
                        Ees-- Ees the thug who... When señor Harry, he
                        was...!
                      `)
                    },

                    () => {
                      this.game.players.parry.say(`
                        He said something about the stool. I wonder what's
                        there.
                      `)
                    },

                    () => {
                      this.game.players.madchen.say(`
                        That man was really stinky.
                      `)
                    }
                  ])
                })
              }
            })
          }
        })
      }
    })

    const loc = this
  }

  goneTo() {
    this.prisonerGone = this.prisonerGone || false
    this.gotMiniMedal = this.gotMiniMedal || false

    this.game.partyChatInit([
      () => {
        this.game.players.parry.say(`
          This place is really creepy. I'd rather not come down here
          if we don't have to.
        `)
      },

      () => {
        this.game.players.madchen.say(`
          It's dark and cold and smelly down here. I don't like it!
        `)
      }
    ])
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The prison in Fortuna appears to have three cells, and is guarded by a
      single person from behind a door where the prisoners can't see him.
    `)

    this.game.logParagraph(`
      ${
        this.prisonerGone ? ''
        : 'Only the second cell appears to be occupied. '
      }The third cell might be
      holding someone, but you can't see through its door and there aren't
      any sounds coming from inside.
    `)

    const opts = [
      'Leave the prison',
      'Talk to the guard',
    ]

    if (this.prisonerGone) {
      if (!this.gotMiniMedal) {
        opts.push('Look under the stool in the open cell')
      }
    } else {
      opts.push('Talk to the man in the second jail cell')
    }

    opts.push(
      'Go through the locked cell door',
      'Party chat'
    )

    return this.game.prompt(...opts).then(([ selected ]) => {
      if (selected === 'Leave the prison')
        return this.game.goTo('Fortuna/Far-northern')

      else if (selected === 'Talk to the guard')
        return this.game.talkTo(this.characters.guard)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the man in the second jail cell')
        return this.game.talkTo(this.characters.prisoner)
          .then(() => this.continueToIndex())

      else if (selected === 'Look under the stool in the open cell') {
        this.game.logParagraph(`
          You look under the stool..
        `)

        return this.game.prompt('Continue..')
          .then(() => {
            this.gotMiniMedal = true
            return this.game.getMiniMedal()
          })
          .then(() => this.continueToIndex())
      }

      else if (selected === 'Go through the locked cell door')
        return this.game.goTo('Fortuna/Locked Prison Cell')

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())
    })
  }

  set prisonerGone(val) {
    this.game.saveEtc.fortunaPrisonerGone = val
  }

  get prisonerGone() {
    return this.game.saveEtc.fortunaPrisonerGone
  }

  set gotMiniMedal(val) {
    this.game.saveEtc.fortunaPrisonerGotMiniMedal = val
  }

  get gotMiniMedal() {
    return this.game.saveEtc.fortunaPrisonerGotMiniMedal
  }
}
