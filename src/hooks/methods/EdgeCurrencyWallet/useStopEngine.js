// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useStopEngine = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const stopEngine = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return wallet
      .stopEngine()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    stopEngine,
  }
}
