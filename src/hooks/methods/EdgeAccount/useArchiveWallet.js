// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useArchiveWallet = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const archiveWallet = (account: EdgeAccount, walletId: string) => {
    onStart()
    return account
      .changeWalletStates({ [walletId]: { archived: true } })
      .then(onSuccess)
      .catch(onError)
  }

  return {
    archiveWallet,
    error,
    pending,
    reset,
  }
}
