import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetDisplayPrivateSeed = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getDisplayPrivateSeed = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getDisplayPrivateSeed']>) => {
      onStart()
      Promise.resolve(wallet.getDisplayPrivateSeed(...args))
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getDisplayPrivateSeed,
    error,
    pending,
    reset,
  }
}
