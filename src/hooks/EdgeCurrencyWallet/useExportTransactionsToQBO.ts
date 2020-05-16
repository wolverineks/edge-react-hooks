import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useExportTransactionsToQBO = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

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
