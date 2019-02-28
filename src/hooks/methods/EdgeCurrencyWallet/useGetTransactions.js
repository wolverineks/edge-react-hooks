// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetTransactions = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const getTransactions = (wallet: EdgeCurrencyWallet, options?: EdgeGetTransactionsOptions) => {
    onStart()
    return wallet
      .getTransactions(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getTransactions,
    pending,
    transactions: (data: ?Array<EdgeTransaction>),
  }
}
