// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type StorageContext = EdgeAccount | EdgeCurrencyWallet
type Stringifyable = string | number | { [string]: Stringifyable } | Array<Stringifyable>

export const useLocalStorageWrite = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const localStorageWrite = (storageContext: StorageContext, path: string, data: string) => {
    onStart()
    return storageContext.localDisklet
      .setText(path, JSON.stringify(data))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    localStorageWrite,
    pending,
  }
}
