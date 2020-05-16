import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetTransactions = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getTransactions = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getTransactions']>) => {
      onStart()
      wallet
        .getTransactions(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getTransactions,
    error,
    pending,
    reset,
  }
}
