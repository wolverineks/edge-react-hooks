// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useStartEngine = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const startEngine = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return wallet
      .startEngine()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    startEngine,
  }
}
