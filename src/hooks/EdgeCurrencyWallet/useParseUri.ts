import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useParseUri = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const parseUri = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['parseUri']>) => {
      onStart()
      wallet
        .parseUri(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    parseUri,
    error,
    pending,
    reset,
  }
}
