const data = require('../data/orders-135.json')

const dataSummary = data.reduce((acc, order) => {
  Object.keys(order).forEach(path => {
    acc[path] = (acc[path] || 0) + order[path]
  })
  return acc
}, {})


const ar = Object.keys(dataSummary).reduce((acc,path) => {
  acc.push({path: dataSummary[path], value: path})
  return acc
}, [])

console.log('total', Object.keys(dataSummary).reduce((acc, key) => acc + dataSummary[key], 0))
console.log(ar.join('\n'))
