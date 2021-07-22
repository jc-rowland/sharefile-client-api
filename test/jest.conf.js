const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'node',
  testTimeout: 50000,
  moduleNameMapper: require('../aliases.config.js').jest,
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
