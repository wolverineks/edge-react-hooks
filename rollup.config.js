// @flow

import babel from 'rollup-plugin-babel'
import rollupPluginFlow from 'rollup-plugin-flow'
import flowEntry from 'rollup-plugin-flow-entry'

import packageJson from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [{ file: packageJson.main, format: 'cjs', sourcemap: true }],
    plugins: [
      flowEntry(),
      rollupPluginFlow({ all: true, pretty: true }),
      babel({ exclude: 'node_modules/**', plugins: ['transform-class-properties'] }),
    ],
  },
]
