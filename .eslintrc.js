module.exports = {
  root: true, // allow child eslint to inherit it
  // extends: 'airbnb', // opposite to root, but needs install airbnb configs
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015
  },

  env: {
    browser: true,
    node: true,
  },

  rules: {
    'indent': ['error', 2],
    'quotes': 'off',
    'no-console': 'error',
  }
}