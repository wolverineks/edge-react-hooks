// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useResyncBlockchain = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const resyncBlockchain = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return wallet
      .resyncBlockchain()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    resyncBlockchain,
  }
}
