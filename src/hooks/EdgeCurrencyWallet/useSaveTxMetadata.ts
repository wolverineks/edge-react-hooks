import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useSaveTxMetadata = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const saveTxMetadata = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['saveTxMetadata']>) => {
      onStart()
      wallet
        .saveTxMetadata(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    saveTxMetadata,
    error,
    pending,
    reset,
  }
}
