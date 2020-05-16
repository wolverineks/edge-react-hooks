import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useDenominationToNative = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const denominationToNative = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['denominationToNative']>) => {
      onStart()
      wallet
        .denominationToNative(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    denominationToNative,
    error,
    pending,
    reset,
  }
}
