import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useResyncBlockchain = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const resyncBlockchain = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['resyncBlockchain']>) => {
      onStart()
      wallet
        .resyncBlockchain(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    resyncBlockchain,
    error,
    pending,
    reset,
  }
}
