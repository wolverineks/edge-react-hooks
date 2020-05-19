import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useExportTransactionsToQBO = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync<string>()

  const exportTransactionsToQBO = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['exportTransactionsToQBO']>) => {
      onStart()
      wallet
        .exportTransactionsToQBO(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    exportTransactionsToQBO,
    error,
    pending,
    reset,
  }
}
