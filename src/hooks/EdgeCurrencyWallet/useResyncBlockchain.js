// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useResyncBlockchain = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const resyncBlockchain = (wallet: EdgeCurrencyWallet) => {
    onStart()
    wallet
      .resyncBlockchain()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    resyncBlockchain,
  }
}
