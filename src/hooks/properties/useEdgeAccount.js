// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate.js'

export const useEdgeAccount = (account: EdgeAccount, properties: Array<$Keys<EdgeAccount>>) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map(property => account.watch(property, forceUpdate))

    if (unsubscribes.length > 0) forceUpdate()

    const unsubscribe = () => unsubscribes.forEach(fn => fn())
    return unsubscribe
  }

  useEffect(effect, [account])

  return void 0
}
