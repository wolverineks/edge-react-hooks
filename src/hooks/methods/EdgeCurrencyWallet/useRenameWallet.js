// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRenameWallet = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const renameWallet = (wallet: EdgeCurrencyWallet, name: string) => {
    onStart()
    return wallet
      .renameWallet(name)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    renameWallet,
  }
}
