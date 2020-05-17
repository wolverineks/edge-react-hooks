import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeAccount, EdgeCurrencyWallet } from '../../types'

type Syncable = EdgeAccount | EdgeCurrencyWallet

export const useSync = (syncable: Syncable) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const sync = React.useCallback(() => {
    onStart()
    syncable.sync().then(onSuccess).catch(onError)
  }, [onError, onStart, onSuccess, syncable])

  return {
    error,
    pending,
    reset,
    sync,
  }
}
