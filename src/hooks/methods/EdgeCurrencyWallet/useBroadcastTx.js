// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useBroadcastTx = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const broadcastTx = (wallet: EdgeCurrencyWallet, tx: EdgeTransaction) => {
    onStart()
    return wallet
      .broadcastTx(tx)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    broadcastTx,
    error,
    pending,
    transaction: data,
  }
}
