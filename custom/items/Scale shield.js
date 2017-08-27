'use strict'

const makeItem = require('../../makeItem')

module.exports = makeItem({
  name: 'Scale shield',
  price: 180,
  type: 'shield',

  equipable: true,
  equippers: [],

  singular: 'A scale shield'
})
