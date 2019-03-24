// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type StorageContext = EdgeAccount | EdgeCurrencyWallet

export const useSyncedStorageWrite = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const syncedStorageWrite = (storageContext: StorageContext, path: string, data: any) => {
    onStart()
    storageContext.disklet
      .setText(path, JSON.stringify(data))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    syncedStorageWrite,
  }
}
