import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useSweepPrivateKeys = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const sweepPrivateKeys = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['sweepPrivateKeys']>) => {
      onStart()
      wallet
        .sweepPrivateKeys(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    sweepPrivateKeys,
    error,
    pending,
    reset,
  }
}
