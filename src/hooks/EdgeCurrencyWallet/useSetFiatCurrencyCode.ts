import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useSetFiatCurrencyCode = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const setFiatCurrencyCode = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['setFiatCurrencyCode']>) => {
      onStart()
      wallet
        .setFiatCurrencyCode(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    setFiatCurrencyCode,
    error,
    pending,
    reset,
  }
}
