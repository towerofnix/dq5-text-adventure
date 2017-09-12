const Character = require('../../../Character')

module.exports = class Priest extends Character {
  talkedTo() {
    this.say(`
      All living creatures are children of the Goddess. What brings you to
      our church, child?
    `)

    const infiniteLop = () => this.game.prompt(
      'Confession (Save)',
      'Leave'
    ).then(([ selected ]) => {

      if (selected === 'Leave') {
        this.say(`
          Great Goddess, may you watch over and protect this poor child!
        `)
        return
      }

      else if (selected === 'Confession (Save)') {
        this.say(`
          Confess all that you have done before the almighty Goddess, child.
        `)

        this.say(`
          And would you allow me to record your works in an adventure log?
        `)

        let saved = false

        return this.game.promptYesNo().then((shouldSave) => {
          if (shouldSave) {
            saved = true

            return this.save()
          } else {
            saved = false

            this.say(`
              You would prefer not to record your adventure? Well, that is
              your decision.
            `)
          }
        }).then(() => {
          this.say(`
            Do you intend to continue on your adventure at this point, my
            child?
          `)

          return this.game.promptYesNo()
        }).then(shouldContinueAdventure => {
          if (shouldContinueAdventure) {
            this.say(`
              Great Goddess, may you watch over and protect this poor child!
            `)
          } else {
            if (saved) {
              return this.quit()
            } else {
              this.say(`
                By the Goddess! You intend to rest from your adventures
                without recording what you have done in an adventure log? You
                would have to restart your adventure from the time of your
                last confession. Are you sure this is what you want?
              `)

              return this.game.promptNoYes().then(confirm => {
                if (confirm) {
                  return this.quit()
                } else {
                  return infiniteLop()
                }
              })
            }
          }
        })
      }

    })

    return infiniteLop()
  }

  quit() {
    this.say(`
      O great and compassionate Goddess, please grant this child a
      peaceful respite!
    `)

    return this.game.prompt('Continue..').then(() => {
      this.game.clearConsole()

      this.game.logParagraph(`
        Bless you, my child. Please turn the power OFF.
      `)

      return this.game.prompt('Quit')
    }).then(() => {
      this.game.clearConsole()
      process.exit()
    })
  }

  save() {
    this.game.logParagraph(`
      Saving.. do not kill the game.
    `)

    return this.game.save()
  }
}
