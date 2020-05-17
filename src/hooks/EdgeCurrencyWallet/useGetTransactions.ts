import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet, EdgeTransaction } from '../../types'

export const useGetTransactions = (wallet: EdgeCurrencyWallet) => {
  const { data, onStart, onSuccess, onError, reset, pending, error } = useAsync<EdgeTransaction[]>()

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
    transactions: data,
  }
}
