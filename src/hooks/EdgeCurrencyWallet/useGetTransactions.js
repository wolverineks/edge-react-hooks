// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetTransactions = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getTransactions = (wallet: EdgeCurrencyWallet, options?: EdgeGetTransactionsOptions) => {
    onStart()
    wallet
      .getTransactions(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getTransactions,
    pending,
    reset,
    transactions: data,
  }
}
