module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'camelcase': [
      'error',
      {
        ignoreDestructuring: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
