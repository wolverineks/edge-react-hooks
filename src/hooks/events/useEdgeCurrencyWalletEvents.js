// @flow

import { type EdgeCurrencyWallet, type EdgeCurrencyWalletEvents } from 'edge-core-js'
import { useEffect } from 'react'

type Hack = any

export const useEdgeCurrencyWalletEvents = (
  wallet: EdgeCurrencyWallet,
  on?: { [$Keys<EdgeCurrencyWalletEvents>]: (any) => mixed } = {},
) => {
  const effect = () => {
    const unsubscribes = Object.entries(on).map(([event, callback]: [Hack, Hack]) => wallet.on(event, callback))

    const unsubscribe = () => {
      unsubscribes.forEach(fn => fn())
    }

    return unsubscribe
  }

  useEffect(effect, [wallet, on])

  return void 0
}
