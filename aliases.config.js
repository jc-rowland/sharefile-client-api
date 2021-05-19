const path = require('path')
function resolveSrc (_path) {
  return path.join(__dirname, _path)
}

const aliases = {
  '@': 'src',
  'src': 'src',
  '__mocks__': 'tests/unit/__mocks__'
}

module.exports = {
  jest: {}
}

Object.entries(aliases)
  .forEach(([alias, route]) => {
    module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${route}/$1`
  })
