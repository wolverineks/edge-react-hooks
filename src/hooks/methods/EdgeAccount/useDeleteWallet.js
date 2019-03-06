// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDeleteWallet = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const deleteWallet = (account: EdgeAccount, walletId: string) => {
    onStart()
    return account
      .changeWalletStates({ [walletId]: { deleted: true } })
      .then(onSuccess)
      .catch(onError)
  }

  return {
    deleteWallet,
    error,
    pending,
    reset,
  }
}
