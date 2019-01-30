// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from './useForceUpdate.js'

export const useEdgeAccount = (account: ?EdgeAccount, properties: Array<$Keys<EdgeAccount>>) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map(property => (account ? account.watch(property, forceUpdate) : () => null))
    const unsubscribe = () => unsubscribes.forEach(fn => fn())
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, [account])

  return void 0
}
