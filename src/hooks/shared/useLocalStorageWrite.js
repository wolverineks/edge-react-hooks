// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type StorageContext = EdgeAccount | EdgeCurrencyWallet

export const useLocalStorageWrite = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const localStorageWrite = (storageContext: StorageContext, path: string, data: any) => {
    onStart()
    storageContext.localDisklet
      .setText(path, JSON.stringify(data))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    localStorageWrite,
    pending,
    reset,
  }
}
