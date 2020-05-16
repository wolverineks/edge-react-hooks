import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useStopEngine = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const stopEngine = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['stopEngine']>) => {
      onStart()
      wallet
        .stopEngine(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    stopEngine,
    error,
    pending,
    reset,
  }
}
