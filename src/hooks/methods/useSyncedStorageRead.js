// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type StorageContext = EdgeAccount | EdgeCurrencyWallet

export const useSyncedStorageRead = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const syncedStorageRead = (storageContext: StorageContext, path: string) => {
    onStart()
    return storageContext.disklet
      .getText(path)
      .then(JSON.parse)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    syncedStorage: (data: any),
    syncedStorageRead,
  }
}
