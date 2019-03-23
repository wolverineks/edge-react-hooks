// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useStopEngine = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const stopEngine = (wallet: EdgeCurrencyWallet) => {
    onStart()
    wallet
      .stopEngine()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    stopEngine,
  }
}
