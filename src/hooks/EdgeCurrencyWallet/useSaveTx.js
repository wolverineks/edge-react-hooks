// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSaveTx = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const saveTx = (wallet: EdgeCurrencyWallet, tx: EdgeTransaction) => {
    onStart()
    wallet
      .saveTx(tx)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    saveTx,
  }
}
