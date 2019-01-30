// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect } from 'react'

import { useForceUpdate } from './useForceUpdate.js'

export const useEdgeCurrencyWallet = (
  wallet: ?EdgeCurrencyWallet,
  properties: Array<$Keys<EdgeCurrencyWallet>> = []
) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map(property => (wallet ? wallet.watch(property, forceUpdate) : () => null))
    const unsubscribe = () => unsubscribes.forEach(fn => fn())
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, [wallet])

  return void 0
}
