import { EdgeCurrencyWallet, EdgeTransaction } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useSignTx = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<EdgeTransaction>()

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
    transaction: data,
    signTx,
    error,
    pending,
    reset,
  }
}
