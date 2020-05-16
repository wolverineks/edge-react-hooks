import * as React from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate.js'
import { EdgeCurrencyWallet } from '../../types.js'

type WalletProperties = (keyof EdgeCurrencyWallet)[]

export const useEdgeCurrencyWallet = (
  wallet: EdgeCurrencyWallet,
  properties: WalletProperties = Object.keys(wallet) as WalletProperties,
) => {
  const forceUpdate = useForceUpdate()

  const effect = () => {
    const unsubscribes = properties.map((property) => wallet.watch(property, forceUpdate))
    if (unsubscribes.length > 0) forceUpdate()
    const unsubscribe = () => unsubscribes.forEach((fn) => fn())

    return unsubscribe
  }

  React.useEffect(effect, [forceUpdate, properties, wallet])
}
