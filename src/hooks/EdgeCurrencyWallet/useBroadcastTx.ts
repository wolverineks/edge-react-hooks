import { EdgeCurrencyWallet, EdgeTransaction } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useBroadcastTx = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<EdgeTransaction>()

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
    transaction: data,
    broadcastTx,
    error,
    pending,
    reset,
  }
}
