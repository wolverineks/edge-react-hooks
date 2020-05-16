import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetMaxSpendable = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getMaxSpendable = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getMaxSpendable']>) => {
      onStart()
      wallet
        .getMaxSpendable(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getMaxSpendable,
    error,
    pending,
    reset,
  }
}
