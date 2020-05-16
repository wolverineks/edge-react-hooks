import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useEnableTokens = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const enableTokens = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['enableTokens']>) => {
      onStart()
      wallet
        .enableTokens(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    enableTokens,
    error,
    pending,
    reset,
  }
}
