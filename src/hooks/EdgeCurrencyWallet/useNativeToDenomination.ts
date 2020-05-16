import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useNativeToDenomination = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const nativeToDenomination = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['nativeToDenomination']>) => {
      onStart()
      wallet
        .nativeToDenomination(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    nativeToDenomination,
    error,
    pending,
    reset,
  }
}
