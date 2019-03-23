// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetNumTransactions = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getNumTransactions = (wallet: EdgeCurrencyWallet, options?: EdgeCurrencyCodeOptions) => {
    onStart()
    wallet
      .getNumTransactions(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getNumTransactions,
    numTransactions: data,
    pending,
    reset,
  }
}
