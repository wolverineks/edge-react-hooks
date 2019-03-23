// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDumpData = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const dumpData = (wallet: EdgeCurrencyWallet) => {
    onStart()
    wallet
      .dumpData()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    data: data,
    dumpData,
    error,
    pending,
    reset,
  }
}
