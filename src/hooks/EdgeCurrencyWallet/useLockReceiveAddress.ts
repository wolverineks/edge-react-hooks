import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useLockReceiveAddress = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const lockReceiveAddress = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['lockReceiveAddress']>) => {
      onStart()
      wallet
        .lockReceiveAddress(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    lockReceiveAddress,
    error,
    pending,
    reset,
  }
}
