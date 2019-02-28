// @flow

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
  ],
  plugins: ['react-hooks', 'promise'],
  rules: {
    'sort-keys': 'error',
    'flowtype/require-valid-file-annotation': [2, 'always'],
    'flowtype/newline-after-flow-annotation': [2, 'always'],
    'flowtype/sort-keys': [
      2,
      'asc',
      {
        caseSensitive: true,
        natural: false,
      },
    ],
    'flowtype/no-dupe-keys': 2,
    'flowtype/require-exact-type': [2, 'always'],
    'no-throw-literal': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'react-hooks/rules-of-hooks': 'error',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
}
