import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetReceiveAddress = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getReceiveAddress = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getReceiveAddress']>) => {
      onStart()
      wallet
        .getReceiveAddress(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getReceiveAddress,
    error,
    pending,
    reset,
  }
}
