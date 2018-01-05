var context = require.context(".", true, /\.js$/);
var All = {}
context.keys().forEach(function (key) {
  if(key != './index.js')
    All[key] = context(key)
});

module.exports = All
