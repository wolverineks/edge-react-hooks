import { EdgeAccount, EdgeContext, EdgeCurrencyConfig, EdgeCurrencyWallet, EdgeSwapConfig } from 'edge-core-js'
import * as React from 'react'
import { Subscriber } from 'yaob'

import { useForceUpdate } from '../../utils/useForceUpdate'

type Watchable = { watch: Subscriber<any> }

export const useWatch = <W extends Watchable, P extends keyof W>(
  object: W,
  property: P,
  callback?: (data: W[P]) => any,
): void => {
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    const unsub = object.watch(property, callback || forceUpdate)

    return () => {
      unsub()
    }
  })
}

export const useWatchAll = <E extends Watchable>(object: E): void => {
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    const unsubs = Object.keys(object).map((property) => object.watch(property, forceUpdate))

    return () => unsubs.forEach((unsub) => unsub())
  }, [object, forceUpdate])
}

export const useEdgeContext = (context: EdgeContext): void => useWatchAll(context)
export const useEdgeAccount = (account: EdgeAccount): void => useWatchAll(account)
export const useEdgeCurrencyWallet = (wallet: EdgeCurrencyWallet): void => useWatchAll(wallet)
export const useEdgeCurrencyConfig = (config: EdgeCurrencyConfig): void => useWatchAll(config)
export const useEdgeSwapConfig = (swapConfig: EdgeSwapConfig): void => useWatchAll(swapConfig)
