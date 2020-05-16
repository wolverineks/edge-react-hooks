import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useSaveTx = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const saveTx = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['saveTx']>) => {
      onStart()
      wallet
        .saveTx(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    saveTx,
    error,
    pending,
    reset,
  }
}
