'use strict'

module.exports = function makeItem(props) {
  return Object.assign({
    price: 0,
    name: 'Unnamed Item',

    equipable: false,
    equippers: [],

    description: 'Doesn\'t appear to have any special effects.',
    singular: 'An Unnamed Item'
  }, props)
}
