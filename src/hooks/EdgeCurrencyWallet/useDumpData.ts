import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useDumpData = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const dumpData = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['dumpData']>) => {
      onStart()
      wallet
        .dumpData(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    dumpData,
    error,
    pending,
    reset,
  }
}
