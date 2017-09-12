'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaFarNorthernHouse extends Location {
  constructor() {
    super({
      name: 'Fortuna Far-northern House',
      characters: {
        mridula: new (class extends Character {
          constructor() {
            super({
              name: 'Mystic Mridula'
            })
          }

          talkedTo() {
            this.say(`
              Kah ha ha hah! Well-well, well-well! I am Mystic Mridula,
              please. The Fortuna fortune-teller of fortunes! Kah ha ha ha
              hah!
            `)

            return this.game.prompt('Continue..').then(() => {
              this.say(`
                Usually, I am only telling fortunes at night. But for a
                handsome young lovely like you, I will be doing it at any
                time of day! Kah ha ha hah!
              `)

              return this.game.prompt('Continue..')
            }).then(() => {
              this.game.clearConsole()

              this.say(`
                Yesss... Yesss...
              `)

              return this.game.prompt('Continue..')
            }).then(() => {
              this.say(`
                Kah ha ha ha hah! The person you are looking for is not in
                this land!
              `)

              this.say(`
                Many moons ago, I am hearing of these people who are guarding
                the gate to another world. Your answers are lying there.
              `)
            })
          }
        })
      }
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      You're in a fairly average two-roomed house: a kitchen/dining-room
      combination connected to a bedroom. Everything in the house is fit for
      two - two beds, two chairs at the two tables.
    `)

    this.game.logParagraph(`
      Sitting at the table in the kitchen is an old lady adorned with all
      sorts of various clothing that reminds you of witches in old children
      stories.
    `)

    return this.game.prompt(
      'Leave the house',
      'Talk to the old lady',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the house')
        return this.game.goTo('Fortuna/Far-northern')

      else if (selected === 'Talk to the old lady')
        return this.game.talkTo(this.characters.mridula)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
