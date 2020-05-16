import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useSignTx = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const signTx = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['signTx']>) => {
      onStart()
      wallet
        .signTx(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    signTx,
    error,
    pending,
    reset,
  }
}
