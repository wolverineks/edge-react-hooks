// @flow

module.exports = {
  extends: [
    'standard',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all'
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'standard', 'react', 'react-native', 'react-hooks'],
  rules: {
    'flowtype/require-valid-file-annotation': [2, 'always'],
    'flowtype/semi': [2, 'never'],
    'flowtype/newline-after-flow-annotation': [2, 'always'],
    'flowtype/sort-keys': [
      2,
      'asc',
      {
        caseSensitive: true,
        natural: false
      }
    ],
    'flowtype/no-dupe-keys': 2,
    'no-throw-literal': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'react-native/no-color-literals': 0,
    'react-native/no-inline-styles': 0,
    'react-hooks/rules-of-hooks': 'error'
  }
}
