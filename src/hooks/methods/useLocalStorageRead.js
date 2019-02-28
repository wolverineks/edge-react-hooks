// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type StorageContext = EdgeAccount | EdgeCurrencyWallet

export const useLocalStorageRead = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const localStorageRead = (storageContext: StorageContext, path: string) => {
    onStart()
    return storageContext.localDisklet
      .getText(path)
      .then(JSON.parse)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    localStorage: (data: ?string),
    localStorageRead,
    pending,
  }
}
