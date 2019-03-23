// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate.js'

export const useEdgeContext = (context: EdgeContext, properties?: Array<$Keys<EdgeContext>> = Object.keys(context)) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map(property => context.watch(property, forceUpdate), [])
    if (unsubscribes.length > 0) forceUpdate()
    const unsubscribe = () => unsubscribes.forEach(fn => fn())

    return unsubscribe
  }

  useEffect(effect, [context])

  return void 0
}
