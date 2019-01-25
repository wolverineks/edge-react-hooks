// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from './useForceUpdate.js'

export const useEdgeContext = (context: ?EdgeContext, properties: Array<$Keys<EdgeContext>> = []) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    if (!context) return // mount with null
    const unsubscribes = properties.map(key => (context ? context.watch(key, forceUpdate) : () => null))
    const unsubscribe = () => unsubscribes.forEach(fn => fn())
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [context]) // onUpdate

  return void 0
}
