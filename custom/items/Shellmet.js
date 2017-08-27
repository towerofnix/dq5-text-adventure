'use strict'

const makeItem = require('../../makeItem')

module.exports = makeItem({
  name: 'Shellmet',
  price: 150,
  type: 'helmet',

  equipable: true,
  equippers: [],

  singular: 'A shellmet'
})
