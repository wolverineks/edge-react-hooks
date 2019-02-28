// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSignTx = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()
  const signTx = (wallet: EdgeCurrencyWallet, tx: EdgeTransaction) => {
    onStart()
    return wallet
      .signTx(tx)
      .then(onSuccess)
      .catch(onError)
  }

  return { signTx, ...rest }
}
