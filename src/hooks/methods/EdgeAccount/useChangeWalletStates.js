// @flow

import { type EdgeAccount, type EdgeWalletStates } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useChangeWalletStates = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const changeWalletStates = (account: EdgeAccount, walletStates: EdgeWalletStates) => {
    onStart()
    return account
      .changeWalletStates(walletStates)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    changeWalletStates,
    error,
    pending,
  }
}
