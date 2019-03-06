// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetReceiveAddress = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getReceiveAddress = (wallet: EdgeCurrencyWallet, options?: EdgeCurrencyCodeOptions) => {
    onStart()
    return wallet
      .getReceiveAddress(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getReceiveAddress,
    pending,
    receiveAddress: (data: ?EdgeReceiveAddress),
    reset,
  }
}
