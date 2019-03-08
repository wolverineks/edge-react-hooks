// @flow

import { type EdgeAccount, type EdgeAccountEvents } from 'edge-core-js'
import { useEffect } from 'react'

type Hack = any

export const useEdgeAccountEvents = (
  account: EdgeAccount,
  on?: { [$Keys<EdgeAccountEvents>]: (any) => mixed } = {},
) => {
  const effect = () => {
    const unsubscribes = Object.entries(on).map(([event, callback]: [Hack, Hack]) => account.on(event, callback))

    const unsubscribe = () => {
      unsubscribes.forEach(fn => fn())
    }

    return unsubscribe
  }

  useEffect(effect, [account, on])

  return void 0
}
