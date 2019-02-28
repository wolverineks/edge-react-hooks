// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetTransactions = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getTransactions = (wallet: EdgeCurrencyWallet, options?: EdgeGetTransactionsOptions) => {
    onStart()
    return wallet
      .getTransactions(options)
      .then(onSuccess)
      .catch(onError)
  }

  return { getTransactions, ...rest }
}
