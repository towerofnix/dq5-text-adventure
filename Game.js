'use strict'

// Number of milliseconds between rendering each prompt line, when a prompt
// dialog is opened.
const PROMPT_ANIM_MS = 0

const fs = require('fs')

const { values, unindent, paragraphize } = require('./util')
const Location = require('./Location')

module.exports = class Game {
  constructor({
    // List of playable characters.
    players = {}
  } = {}) {
    this.locations = {}
    this.items = {}
    this.players = players

    this.currentLocation = null
    this.partyChatScenes = []

    this.casinoTokens = 0
    this.gold = 0
    this.bankedGold = 0
    this.miniMedals = 0

    this.saveEtc = {}

    this.assignGame()
  }


  // Methods ----------------------------------------------------------------

  // Save, asynchronously. Saves to .savefile.json by default.
  save(file = '.savefile.json') {
    const saveObj = {
      location: this.currentLocation.name,
      gold: this.gold,
      bankedGold: this.bankedGold,
      miniMedals: this.miniMedals,
      players: {},
      etc: this.saveEtc
    }

    for (let playerKey in this.players) {
      saveObj.players[playerKey] = this.players[playerKey].save()
    }

    const saveString = JSON.stringify(saveObj, null, 2)

    return new Promise((resolve, reject) => {
      fs.writeFile(file, saveString, err => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  }

  // Load, asynchronously. Loads from .savefile.json by default.
  load(file = '.savefile.json') {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, text) => {
        if (err) {
          reject(err)
          return
        }

        const loadString = text.toString()
        const loadObj = JSON.parse(text)

        this.gold = loadObj.gold || 0
        this.bankedGold = loadObj.bankedGold || 0
        this.miniMedals = loadObj.miniMedals || 0
        this.saveEtc = loadObj.etc || {}

        const loadPlayers = loadObj.players || {}
        for (let playerKey in this.players) {
          this.players[playerKey].load(loadPlayers[playerKey] || {})
        }

        this.goTo(loadObj.location || 'Fortuna/Inn')

        resolve()
      })
    })
  }

  // Go to a location. Use the location's module name.
  goTo(location) {
    this.partyChatScenes = []

    this.currentLocation = this.getLocation(location)
    this.currentLocation.goneTo()

    return this.currentLocation.index()
  }

  // Talk to a character.
  talkTo(character) {
    return Promise.resolve(character.talkedTo())
  }

  // Get a location. Loads the location if needed.
  getLocation(moduleName) {
    if (moduleName in this.locations) {
      return this.locations[moduleName]
    } else {
      let cls

      try {
        cls = require('./custom/locations/' + moduleName)
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          console.error(err.stack)
          const locationModuleNotFound = new Error(
            `Location module "${moduleName}" does not exist!`
          )
          throw locationModuleNotFound
        } else {
          throw err
        }
      }

      const location = new cls()
      this.locations[moduleName] = location
      location.assignGame(this)
      return location
    }
  }

  // Get an item. Loads the item if needed. Note that items are not class
  // instances but rather more basic objects.
  getItem(moduleName) {
    if (moduleName in this.items) {
      return this.items[moduleName]
    } else {
      let item

      try {
        item = require('./custom/items/' + moduleName)
      } catch(err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          const itemModuleNotFound = new Error(
            `Item module "${moduleName}" does not exist!
          `)
          throw itemModuleNotFound
        } else {
          throw err
        }
      }

      this.items[moduleName] = item
      item.game = this
      return item
    }
  }

  // Internal method to assign the game to this game(!), all locations, and
  // all player characters.
  assignGame() {
    this.game = this

    for (let location of values(this.locations)) {
      location.assignGame(this)
    }

    for (let character of values(this.players)) {
      character.assignGame(this)
    }
  }

  // Show a prompt dialog.
  prompt(...opts) {
    return new Promise(resolve => {
      let selected = 0

      const keepSelectionInRange = () => {
        if (selected < 0) selected = opts.length - 1
        if (selected > opts.length - 1) selected = 0
      }

      const writeAllOptions = (ms = 50) => {
        return new Promise(resolve => {
          let i = 0;

          const next = () => {
            if (i === selected) {
              process.stdout.write('\x1b[1m[x] ')
            } else {
              process.stdout.write('\x1b[0m[.] ')
            }
            process.stdout.write(opts[i] + '\n')

            i += 1

            if (i < opts.length) {
              if (ms) {
                setTimeout(next, ms)
              } else {
                next()
              }
            } else {
              resolve()
            }
          }

          next()
        }).then(() => {
          process.stdout.write('\x1b[0m')
        })
      }

      const moveCursorAboveOptions = () => {
        process.stdout.write(`\x1b[${opts.length}A`)
      }

      writeAllOptions(PROMPT_ANIM_MS).then(() => {
        const stdin = process.stdin
        stdin.resume()
        stdin.setRawMode(true)

        // once instead of on, so that we don't need to get rid of this
        // listener after pressing J
        stdin.once('data', function data(evt) {
          const key = evt.toString()

          if (key === 'i') { // I
            selected--
            keepSelectionInRange()
          } else if (key === 'k') { // K
            selected++
            keepSelectionInRange()
          } else if (key === 'j') { // J
            stdin.setRawMode(false)
            stdin.pause()

            process.stdout.write('\n')
            resolve([opts[selected], selected])

            return
          }

          moveCursorAboveOptions()
          writeAllOptions(0).then(() => {
            stdin.once('data', data)
          })
        })
      })
    })
  }

  // Quick and easy yes/no dialog, based on prompt.
  promptYesNo() {
    return this.prompt('Yes', 'No')
      .then(([ selected ]) => selected === 'Yes')
  }

  // Same as promptYesNo, but with No as the default choice.
  // TODO: This could be confusing - maybe have a way for prompt to take a
  // default selected value, instead of having to position No before Yes.
  promptNoYes() {
    return this.prompt('No', 'Yes')
      .then(([ selected ]) => selected === 'Yes')
  }

  // Prompt for a number. May take a message.
  promptNumber(msg = '') {
    let value = ''

    const write = () => {
      const x = value.length ? value : '0'
      process.stdout.write(`\r ${msg} \x1b[2m--\x1b[0m ${x}`)
    }

    write()

    return new Promise(resolve => {
      const stdin = process.stdin
      stdin.resume()
      stdin.setRawMode(true)

      stdin.once('data', function data(evt) {
        const key = evt.toString().charCodeAt(0)
        if (key === 106) { // J
          stdin.setRawMode(false)
          stdin.pause()

          process.stdout.write('\n\n')
          resolve(parseInt(value))
          return
        } else if (key === 48) { // 0
          if (value.length) {
            value += '0'
          }
        } else if (key >= 49 && key <= 57) {
          value = value + (key - 48).toString()
        } else if (key === 127) {
          value = value.slice(0, value.length - 1)
          write()
          process.stdout.write(' ')
        }

        write()

        stdin.once('data', data)
      })
    })
  }

  promptPlayer(...moreOpts) {
    const playerKeys = Object.keys(this.players)
    const playerNames = playerKeys.map(k => this.players[k].name)

    return this.prompt(...playerNames, ...moreOpts)
      .then(([ selected, selectedIndex]) => {
        // Selection is from moreOpts
        if (selectedIndex >= playerNames.length) {
          return selected
        }

        const selectedPlayer = this.players[playerKeys[selectedIndex]]

        return selectedPlayer
      })
  }

  // Clear the console.
  clearConsole() {
    process.stdout.write('\x1b[2J\x1b[H')
  }

  // Log a paragraph. The passed text is automatically unindented and
  // otherwise adjusted to be friendly to a terminal.
  logParagraph(text) {
    console.log(paragraphize(text) + '\n')
  }

  // Display a warning. The text appears yellow, bolded and blinking.
  warn(text) {
    console.warn(`\x1b[33;1;5m[WARN] ${text}\x1b[0m`)
  }

  // Initialize new party chat scenes.
  partyChatInit(scene) {
    this.partyChatScenes.push(scene)
  }

  // Remove a party chat scenes from the available scenes. For example, if
  // you talk to someone, you might want to remove the discussion scene from
  // the previous person you talked to.
  removePartyChatScene(scene) {
    if (!scene) return

    this.partyChatScenes.splice(this.partyChatScenes.indexOf(scene), 1)
  }

  // Party chat!
  partyChat() {
    if (!this.partyChatScenes.length) {
      console.log('But nobody has anything to say...\n')
      return Promise.resolve()
    }

    const scene = this.partyChatScenes[this.partyChatScenes.length - 1]
    const discussion = scene.splice(
      Math.floor(Math.random() * scene.length), 1)[0]

    if (scene.length === 0) {
      this.partyChatScenes.pop()
    }

    return Promise.resolve(discussion())
  }

  // Get a mini medal.
  getMiniMedal() {
    this.logParagraph(`
      What luck! A mini medal!
    `)

    this.miniMedals += 1
  }

  // User interface for reviwing items.
  reviewItemsInterface() {
    const infiniteLop = () => {
      this.clearConsole()

      this.logParagraph(`
        The party has ${this.gold} gold coins on hand.
      `)

      this.logParagraph(`
        Review whose items?
      `)

      return this.promptPlayer('Etc..', 'Done reviewing')
        .then(selectedPlayer => {

          if (selectedPlayer === 'Done reviewing') return

          else if (selectedPlayer === 'Etc..') {
            console.log(`Gold: \x1b[1m${this.gold}\x1b[0m`)
            console.log(`- In bank: \x1b[1m${this.bankedGold}\x1b[0m`)
            console.log('')
            console.log(`Mini medals: \x1b[1m${this.miniMedals}\x1b[0m`)
            console.log(`Casino tokens: \x1b[1m${this.casinoTokens}\x1b[0m`)
            console.log('')

            return this.prompt('Continue..')
              .then(() => infiniteLop())
          }

          else {
            console.log(`\x1b[1m${selectedPlayer.name}'s items:\x1b[0m`)
            for (let {count, item} of values(selectedPlayer.items)) {
              console.log(`${count} \x1b[2mx\x1b[0m ${item.name}`)
            }

            process.stdout.write('\n')

            return this.prompt('Continue..')
              .then(() => infiniteLop())
          }

        })
    }

    return infiniteLop()
  }
}
