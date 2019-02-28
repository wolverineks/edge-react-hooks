// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSignTx = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()
  const signTx = (wallet: EdgeCurrencyWallet, tx: EdgeTransaction) => {
    onStart()
    return wallet
      .signTx(tx)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    signTx,
    transaction: data,
  }
}
