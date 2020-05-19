import { EdgeCurrencyWallet, EdgeDataDump } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useDumpData = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<EdgeDataDump>()

  const dumpData = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['dumpData']>) => {
      onStart()
      wallet
        .dumpData(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    data,
    dumpData,
    error,
    pending,
    reset,
  }
}
