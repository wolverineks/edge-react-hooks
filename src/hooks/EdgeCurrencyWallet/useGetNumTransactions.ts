import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetNumTransactions = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getNumTransactions = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getNumTransactions']>) => {
      onStart()
      wallet
        .getNumTransactions(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getNumTransactions,
    error,
    pending,
    reset,
  }
}
