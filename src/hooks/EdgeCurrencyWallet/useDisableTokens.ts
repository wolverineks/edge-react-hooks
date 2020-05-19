import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useDisableTokens = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const disableTokens = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['disableTokens']>) => {
      onStart()
      wallet
        .disableTokens(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    disableTokens,
    error,
    pending,
    reset,
  }
}
