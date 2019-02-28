// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type StorageContext = EdgeAccount | EdgeCurrencyWallet

export const useSyncedStorageRead = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const syncedStorageRead = (storageContext: StorageContext, path: string) => {
    onStart()
    return storageContext.disklet
      .getText(path)
      .then(JSON.parse)
      .then(onSuccess)
      .catch(onError)
  }

  return { syncedStorageRead, ...rest }
}
