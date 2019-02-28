// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useResyncBlockchain = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const resyncBlockchain = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return wallet
      .resyncBlockchain()
      .then(onSuccess)
      .catch(onError)
  }

  return { resyncBlockchain, ...rest }
}
