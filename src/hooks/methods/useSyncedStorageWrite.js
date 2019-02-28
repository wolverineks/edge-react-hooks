// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type StorageContext = EdgeAccount | EdgeCurrencyWallet
type Stringifyable = string | number | { [string]: Stringifyable } | Array<Stringifyable>

export const useSyncedStorageWrite = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const syncedStorageWrite = (storageContext: StorageContext, path: string, data: string) => {
    onStart()
    return storageContext.disklet
      .setText(path, JSON.stringify(data))
      .then(onSuccess)
      .catch(onError)
  }

  return { syncedStorageWrite, ...rest }
}
