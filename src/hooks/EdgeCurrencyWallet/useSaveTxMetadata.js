// @flow

import { type EdgeCurrencyWallet, type EdgeMetadata } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSaveTxMetadata = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const saveTxMetadata = (wallet: EdgeCurrencyWallet, txid: string, currencyCode: string, metadata: EdgeMetadata) => {
    onStart()
    wallet
      .saveTxMetadata(txid, currencyCode, metadata)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    saveTxMetadata,
  }
}
