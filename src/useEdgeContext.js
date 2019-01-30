// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from './useForceUpdate.js'

export const useEdgeContext = (context: ?EdgeContext, properties: Array<$Keys<EdgeContext>> = []) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map(key => (context ? context.watch(key, forceUpdate) : () => null))
    const unsubscribe = () => unsubscribes.forEach(fn => fn())
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  }

  useEffect(effect, [context])

  return void 0
}
