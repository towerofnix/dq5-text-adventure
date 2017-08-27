'use strict'

// Gets the values of an object, as an array.
const values = function(obj) {
  const results = []
  for (let key in obj) {
    results.push(obj[key])
  }
  return results
}

// Gets the number of spaces at the beginning of a string. Used in unindent.
const getSpaces = function(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      return i
    }
  }
  return str.length
}

// Useful tool for unindenting multiline strings.
const unindent = function(str) {
  const lines = str.split('\n')
  let indent

  for (let line of lines) {
    const numSpaces = getSpaces(line)

    // The line is all whitespace, so skip it.
    if (numSpaces === line.length) {
      continue
    }

    if (numSpaces < indent || !indent) {
      indent = numSpaces
    }
  }

  const resultLines = []
  for (let line of lines) {
    if (getSpaces(line) === line.length) {
      resultLines.push('')
      continue
    }

    resultLines.push(line.slice(indent))
  }

  for (let i = 0; i < resultLines.length; i++) {
    const line = resultLines[i]
    if (getSpaces(line) === line.length) {
      resultLines.splice(i, 1)
    } else {
      break
    }
  }

  for (let i = resultLines.length - 1; i > 0; i--) {
    const line = resultLines[i]
    if (getSpaces(line) === line.length) {
      resultLines.splice(i, 1)
    } else {
      break
    }
  }

  const resultString = resultLines.join('\n')
  return resultString
}

// Magic paragraphizing stuff!
const PARAGRAPHIZE_WIDTH = 60
const paragraphize = function(text, width = PARAGRAPHIZE_WIDTH) {
  const words = unindent(text).split('\n').join(' ').split(' ')

  const lines = []
  let line = ''

  for (let word of words) {
    if (word === '') continue

    if (line.length + word.length >= width) {
      lines.push(line)
      line = ''
    }

    line += word + ' '
  }

  if (line) {
    lines.push(line)
  }

  return lines.join('\n')
}

module.exports = {values, unindent, paragraphize}
