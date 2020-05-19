import { EdgeCurrencyCodeOptions, EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useTransactionCount = (wallet: EdgeCurrencyWallet, options: EdgeCurrencyCodeOptions) => {
  const { onSuccess, onError, pending, error, data } = useAsync<number>()

  React.useEffect(() => {
    wallet.getNumTransactions(options).then(onSuccess).catch(onError)
  }, [onError, onSuccess, options, wallet])

  return {
    transactionCount: data,
    error,
    pending,
  }
}
