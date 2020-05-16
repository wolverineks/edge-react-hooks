import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useMakeSpend = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const makeSpend = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['makeSpend']>) => {
      onStart()
      wallet
        .makeSpend(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    makeSpend,
    error,
    pending,
    reset,
  }
}
