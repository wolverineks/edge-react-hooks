// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate.js'

export const useEdgeCurrencyWallet = (
  wallet: EdgeCurrencyWallet,
  properties?: Array<$Keys<EdgeCurrencyWallet>> = Object.keys(wallet),
) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map(property => wallet.watch(property, forceUpdate))
    if (unsubscribes.length > 0) forceUpdate()
    const unsubscribe = () => unsubscribes.forEach(fn => fn())

    return unsubscribe
  }

  useEffect(effect, [wallet])

  return void 0
}
