import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'

export const CODES = {
  NORMAL: 'Normal',

  A: 'Americano',
  C: 'Cappucino',
  L: 'Latte',
  E: 'Espresso',
  Fw: 'Flat White',
  Hc: 'Hot Choc',
  Cc: 'Chococcino',
  ICE: 'Ice Coffee',
  T: 'Tea',

  Rooi: 'Rooibos',
  Five: 'Five Roses',
  d: 'Double-shot',
  s: 'Single-shot',
  BIG: 'Big',
}

const items = [
  { path: ['A'], price: 1500 },
  { path: ['A', 'd'], price: 1800 },
  { path: ['A', 'BIG'], price: 2400 },

  { path: ['C'], price: 2200 },
  { path: ['C', 'd'], price: 2400 },
  { path: ['C', 'BIG'], price: 2600 },

  { path: ['L'], price: 2200 },
  { path: ['L', 'd'], price: 2400 },
  { path: ['L', 'BIG'], price: 2600 },

  { path: ['Fw'], price: 2600 },
  { path: ['Fw', 'BIG'], price: 3000 },

  { path: ['E'], price: 2600 },
  { path: ['E', 'd'], price: 2600 },

  { path: ['ICE'], price: 2200 },
  { path: ['ICE', 'd'], price: 2400 },

  { path: ['Hc'], price: 2000 },
  { path: ['Hc', 'BIG'], price: 2000 },

  { path: ['Cc'], price: 2400 },
  { path: ['Cc', 'd'], price: 2600 },
  { path: ['Cc', 'BIG'], price: 2800 },

  { path: ['T'], price: 1500 },
  { path: ['T', 'BIG'], price: 1800 },
]
items.forEach(item => {
  item.pathLabels = item.path.map(a => CODES[a])
})

export const fromPath = (path) => {
  return items.find(a => a.path == path)
}

export const totalDrinks = (order) => {
  const total = reduce(order, (acc, count, itemPath) => {
    return acc + count
  }, 0)
  return total
}

export const totalRand = (order) => {
  const total = reduce(order, (acc, count, itemPath) => {
    const item = fromPath(itemPath)
    return acc + (count * item.price)
  }, 0)
  const totalR = Math.ceil(total/100)
  return `R ${totalR}`
}

export default items
