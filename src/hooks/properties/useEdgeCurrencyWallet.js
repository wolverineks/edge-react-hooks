// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate.js'

export const useEdgeCurrencyWallet = (wallet: ?EdgeCurrencyWallet, properties: Array<$Keys<EdgeCurrencyWallet>>) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.reduce((unsubscribes, property) => {
      return wallet ? [...unsubscribes, wallet.watch(property, forceUpdate)] : unsubscribes
    }, [])

    if (unsubscribes.length > 0) forceUpdate()

    const unsubscribe = () => unsubscribes.forEach(fn => fn())
    return unsubscribe
  }

  useEffect(effect, [wallet])

  return void 0
}
