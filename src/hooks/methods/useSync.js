// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

type Syncable = EdgeAccount | EdgeCurrencyWallet

export const useSync = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const sync = (syncable: Syncable) => {
    onStart()
    return syncable
      .sync()
      .then(onSuccess)
      .catch(onError)
  }

  return { sync, ...rest }
}
