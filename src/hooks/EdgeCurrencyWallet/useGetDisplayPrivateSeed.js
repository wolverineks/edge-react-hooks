// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetDisplayPrivateSeed = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getDisplayPrivateSeed = (wallet: EdgeCurrencyWallet) => {
    onStart()
    Promise.resolve(wallet.getDisplayPrivateSeed())
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getDisplayPrivateSeed,
    pending,
    privateSeed: data,
    reset,
  }
}
