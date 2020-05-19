import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useStartEngine = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const startEngine = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['startEngine']>) => {
      onStart()
      wallet
        .startEngine(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    startEngine,
    error,
    pending,
    reset,
  }
}
