// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetDisplayPublicSeed = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getDisplayPublicSeed = (wallet: EdgeCurrencyWallet) => {
    onStart()
    Promise.resolve(wallet.getDisplayPublicSeed())
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getDisplayPublicSeed,
    pending,
    publicSeed: data,
    reset,
  }
}
