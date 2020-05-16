import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetDisplayPublicSeed = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getDisplayPublicSeed = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getDisplayPublicSeed']>) => {
      onStart()
      Promise.resolve(wallet.getDisplayPublicSeed(...args))
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getDisplayPublicSeed,
    error,
    pending,
    reset,
  }
}
