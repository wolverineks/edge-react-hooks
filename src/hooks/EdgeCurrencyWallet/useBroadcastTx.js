// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useBroadcastTx = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const broadcastTx = (wallet: EdgeCurrencyWallet, tx: EdgeTransaction) => {
    onStart()
    wallet
      .broadcastTx(tx)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    broadcastTx,
    error,
    pending,
    reset,
    transaction: data,
  }
}
