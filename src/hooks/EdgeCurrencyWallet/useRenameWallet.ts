import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useRenameWallet = (wallet: EdgeCurrencyWallet) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const renameWallet = React.useCallback(
    (...args: Parameters<EdgeCurrencyWallet['renameWallet']>) => {
      onStart()
      wallet
        .renameWallet(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [onError, onStart, onSuccess, wallet],
  )

  return {
    renameWallet,
    error,
    pending,
    reset,
  }
}
