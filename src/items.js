import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import localData from './items.json'

export var CODES = localData.CODES
export var Items = localData.items
var fetchedRemoteItems = false

export const ensureItems = () => {
  if(fetchedRemoteItems) {
    return Promise.resolve({Items, CODES})
  }
  return fetch('https://rawgit.com/ponelat/coffee-pos/master/src/items.json')
    .then(a => a.json())
    .then(setItems)
}

function setItems(data) {
  console.log("data", data)

  data.items.forEach(item => {
    item.pathLabels = item.path.map(a => CODES[a])
    item.priceRands = `R ${Math.floor(item.price / 100)}`
  })

  Items = data.items
  CODES = data.CODES

  return {Items,CODES}
}


export const fromPath = (path) => {
  return Items.find(a => a.path == path)
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

export const countRootItems = (order, path) => {
  return reduce(order, (acc, count, itemPath) => {
    if(path == itemPath || itemPath.startsWith(path +',')) {
      return acc + count
    }

    return acc
  },0)
}


export default ensureItems
