import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useSaveReceiveAddress = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const saveReceiveAddress = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['saveReceiveAddress']>) => {
      onStart()
      wallet
        .saveReceiveAddress(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    saveReceiveAddress,
    error,
    pending,
    reset,
  }
}
