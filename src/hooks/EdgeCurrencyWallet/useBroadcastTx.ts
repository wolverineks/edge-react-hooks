import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useBroadcastTx = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const broadcastTx = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['broadcastTx']>) => {
      onStart()
      wallet
        .broadcastTx(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    broadcastTx,
    error,
    pending,
    reset,
  }
}
