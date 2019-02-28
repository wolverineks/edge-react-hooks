// @flow

import { type EdgeCurrencyWallet, type EdgeDataDump } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDumpData = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const dumpData = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return wallet
      .dumpData()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    data: (data: ?EdgeDataDump),
    dumpData,
    error,
    pending,
  }
}
