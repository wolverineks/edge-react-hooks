// @flow

import { type EdgeContext, type EdgeContextEvents } from 'edge-core-js'
import { useEffect } from 'react'

type Hack = any

export const useEdgeContextEvents = (
  context: EdgeContext,
  on?: { [$Keys<EdgeContextEvents>]: (any) => mixed } = {},
) => {
  const effect = () => {
    const unsubscribes = Object.entries(on).map(([event, callback]: [Hack, Hack]) => context.on(event, callback))

    const unsubscribe = () => {
      unsubscribes.forEach(fn => fn())
    }

    return unsubscribe
  }

  useEffect(effect, [context, on])

  return void 0
}
