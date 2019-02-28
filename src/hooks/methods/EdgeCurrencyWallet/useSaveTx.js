// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSaveTx = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()
  const saveTx = (wallet: EdgeCurrencyWallet, tx: EdgeTransaction) => {
    onStart()
    return wallet
      .saveTx(tx)
      .then(onSuccess)
      .catch(onError)
  }

  return { saveTx, ...rest }
}
