import * as React from 'react'
import { EdgeCurrencyWallet, EdgeTransaction } from '../../types'

export const useOnNewTransactions = (
  wallet: EdgeCurrencyWallet,
  callback: (transactions: Array<EdgeTransaction>) => any,
) => {
  React.useEffect(() => {
    const unsubscribe = wallet.on('newTransactions', callback as any)
    return () => {
      unsubscribe()
    }
  }, [wallet, callback])
}

export const useOnTransactionsChanged = (
  wallet: EdgeCurrencyWallet,
  callback: (transactions: Array<EdgeTransaction>) => any,
) => {
  React.useEffect(() => {
    const unsubscribe = wallet.on('transactionsChanged', callback as any)
    return () => {
      unsubscribe()
    }
  }, [wallet, callback])

  return void 0
}
