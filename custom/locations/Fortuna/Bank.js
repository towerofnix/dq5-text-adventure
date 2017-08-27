'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaBank extends Location {
  constructor() {
    super({
      name: 'Fortuna - Bank',
      characters: {
        banker: new (class extends Character {
          talkedTo() {
            this.say(`
              Welcome to Rainbow's End Gold Bank.
            `)

            if (this.game.bankedGold > 0) {
              this.say(`
                Yer current balance with us is ${this.game.bankedGold} gold
                coins, ${this.game.players.hero.name}. And how can we be
                helpen' ye today, then?
              `)
            } else {
              this.say(`
                We don't have any gold of yerself's in the vault at the
                moment, ${this.game.players.hero.name}, but can we be helpin'
                ye still an' all, perhaps?
              `)
            }

            return this.game.prompt(
              'Deposit',
              'Withdrawal',
              'Leave'
            ).then(([ selected ]) => {
              if (selected === 'Deposit') {
                const infiniteLop = () => {
                  this.say(`
                    Sure an' we'd be happy to accept yer gold, but we only
                    deal in units of a thousand coins. So... How much would
                    ye be leavin' with us today?
                  `)

                  return this.game.promptNumber('1000x').then(value => {
                    const deposit = value * 1000
                    if (deposit > 0) {
                      if (deposit <= this.game.gold) {
                        this.say(`
                          ${deposit} gold coins, is it? Right, we'll lock it
                          up in the vault straight away. Ye've no need to
                          worry.
                        `)
                        this.game.gold -= deposit
                        this.game.bankedGold += deposit

                        return this.game.prompt('Continue..')
                      } else {
                        this.say(`
                          I don't mean to be rude or nuttin', but ye don't
                          have that much on ye, so ye don't.
                        `)
                        return this.game.prompt('Continue..')
                          .then(() => infiniteLop())
                      }
                    } else {
                      this.say(`
                        Ye've changed yer mind, have ye? Not to worry.
                        Rainbow's End Gold Bank'll be here for ye when ye
                        need it.
                      `)
                    }
                  })
                }

                return infiniteLop()
              } else if (selected === 'Withdrawal') {
                if (this.game.bankedGold === 0) {
                  this.say(`
                    I-I'm sorry, sir, but ye don't appear to have even one
                    gold coin deposited with us at the moment.
                  `)

                  return
                }

                const infiniteLop = () => {
                  this.say(`
                    Yer current balance is ${this.game.bankedGold} gold
                    coins. So how much will ye be lookin' to withdraw today,
                    sir?
                  `)

                  return this.game.promptNumber('1000x').then(value => {
                    const withdraw = value * 1000
                    if (withdraw > 0) {
                      if (withdraw <= this.game.bankedGold) {
                        this.say(`
                          So it'll be ${withdraw}, will it? Aye, well. Here
                          y'are...
                        `)
                        this.game.gold += withdraw
                        this.game.bankedGold -= withdraw

                        return this.game.prompt('Continue..')
                      } else {
                        this.say(`
                          Sure an' that'd be a fine sum, so it would! But ye
                          don't have that much in the bank, y'eej-- Ahem! I
                          mean, sir...
                        `)

                        return this.game.prompt('Continue..')
                          .then(() => infiniteLop())
                      }
                    } else {
                      this.say(`
                        Ye've changed yer mind, have ye? Not to worry.
                        Rainbow's End Gold Bank'll be here for ye when ye
                        need it.
                      `)
                    }
                  })
                }

                return infiniteLop()
              }
            }).then(() => {
              if (this.game.bankedGold > 0) {
                this.say(`
                  At the moment, ye've ${this.game.bankedGold} gold coins
                  safely tucked away in our vault. Thank you very much.
                `)
              } else {
                this.say(`
                  We're not keepin' any gold for yerself at the moment,
                  ${this.game.players.hero.name}, but we look forward to
                  servin' ye again in the future.
                `)
              }
            })
          }
        })
      }
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The bank is a small one, but it's clearly not a low-quality one - the
      floor has a red carpet, and several stools are positioned in convenient
      spots around the room. The banker is standing behind a counter, ready
      to be of help to anyone who might need banking done.
    `)

    return this.game.prompt(
      'Leave the bank',
      'Talk to the banker',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the bank')
        return this.game.goTo('Fortuna/Western')

      else if (selected === 'Talk to the banker')
        return this.game.talkTo(this.characters.banker)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
