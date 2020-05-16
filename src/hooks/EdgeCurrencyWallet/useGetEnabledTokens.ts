import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetEnabledTokens = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getEnabledTokens = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getEnabledTokens']>) => {
      onStart()
      wallet
        .getEnabledTokens(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getEnabledTokens,
    error,
    pending,
    reset,
  }
}
