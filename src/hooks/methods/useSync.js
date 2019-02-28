// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type Syncable = EdgeAccount | EdgeCurrencyWallet

export const useSync = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const sync = (syncable: Syncable) => {
    onStart()
    return syncable
      .sync()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    sync,
  }
}
