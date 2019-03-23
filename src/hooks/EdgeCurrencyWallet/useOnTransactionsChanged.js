// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useEffect } from 'react'

export const useOnTransactionsChanged = (
  wallet: EdgeCurrencyWallet,
  callback: (transactions: Array<EdgeTransaction>) => any,
) => {
  useEffect(() => {
    const unsubscribe = wallet.on('transactionsChanged', callback)
    return () => {
      unsubscribe()
    }
  }, [wallet, callback])

  return void 0
}
