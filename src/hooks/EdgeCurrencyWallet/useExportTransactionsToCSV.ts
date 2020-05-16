import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useExportTransactionsToCSV = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const exportTransactionsToCSV = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['exportTransactionsToCSV']>) => {
      onStart()
      wallet
        .exportTransactionsToCSV(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    exportTransactionsToCSV,
    error,
    pending,
    reset,
  }
}
