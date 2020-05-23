import { EdgeAccount, EdgeContext, EdgeCurrencyWallet, EdgeRateCache } from 'edge-core-js'
import * as React from 'react'

type Closable = EdgeContext | EdgeAccount | EdgeCurrencyWallet | EdgeRateCache

export const useOnClose = (object: Closable, callback: Function) => {
  React.useEffect(() => {
    const unsubscribe = (object.on as Function)('close', callback)

    return () => {
      unsubscribe()
    }
  }, [object, callback])
}
