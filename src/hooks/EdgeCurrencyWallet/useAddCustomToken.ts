import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useAddCustomToken = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const addCustomToken = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['addCustomToken']>) => {
      onStart()
      wallet
        .addCustomToken(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    addCustomToken,
    error,
    pending,
    reset,
  }
}
