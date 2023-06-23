// https://eslint.org/docs/user-guide/configuring

export default {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  "plugins": [
    "babel"
  ],
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    'prettier',
    'eslint-config-prettier'
  ],
  // add your custom rules here
  rules: {
    "babel/semi": 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
