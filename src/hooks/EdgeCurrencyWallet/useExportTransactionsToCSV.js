// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useExportTransactionsToCSV = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const exportTransactionsToCSV = (wallet: EdgeCurrencyWallet, options: EdgeGetTransactionsOptions) => {
    onStart()
    wallet
      .exportTransactionsToCSV(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    csv: data,
    error,
    exportTransactionsToCSV,
    pending,
    reset,
  }
}
