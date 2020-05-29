import { EdgeAccount, EdgeContext, EdgeCurrencyConfig, EdgeCurrencyWallet, EdgeSwapConfig } from 'edge-core-js'
import * as React from 'react'

import { useForceUpdate } from '../../utils/useForceUpdate'

export const useWatch = <T extends { watch: Function }>(object: T, property: keyof T) => {
  const forceUpdate = useForceUpdate()

  React.useEffect(() => object.watch(property, forceUpdate), [object, forceUpdate, property])
}

export const useWatchAll = <T extends { watch: Function }>(object: T) => {
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    const unsubs = Object.keys(object).map((property) => object.watch(property, forceUpdate))

    return () => unsubs.forEach((unsub) => unsub())
  }, [object, forceUpdate])
}

export const useEdgeContext = (context: EdgeContext) => useWatchAll(context)
export const useEdgeAccount = (account: EdgeAccount) => useWatchAll(account)
export const useEdgeCurrencyWallet = (wallet: EdgeCurrencyWallet) => useWatchAll(wallet)
export const useEdgeCurrencyConfig = (config: EdgeCurrencyConfig) => useWatchAll(config)
export const useEdgeSwapConfig = (swapConfig: EdgeSwapConfig) => useWatchAll(swapConfig)
