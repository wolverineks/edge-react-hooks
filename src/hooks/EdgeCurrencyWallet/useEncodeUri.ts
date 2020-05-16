import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useEncodeUri = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const encodeUri = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['encodeUri']>) => {
      onStart()
      wallet
        .encodeUri(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    encodeUri,
    error,
    pending,
    reset,
  }
}
