import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet } from '../../types'

export const useGetPaymentProtocolInfo = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const getPaymentProtocolInfo = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['getPaymentProtocolInfo']>) => {
      onStart()
      wallet
        .getPaymentProtocolInfo(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    getPaymentProtocolInfo,
    error,
    pending,
    reset,
  }
}
