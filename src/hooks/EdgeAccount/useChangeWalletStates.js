// @flow

import { type EdgeAccount, type EdgeWalletStates } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useChangeWalletStates = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const changeWalletStates = (account: EdgeAccount, walletStates: EdgeWalletStates) => {
    onStart()
    account
      .changeWalletStates(walletStates)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    changeWalletStates,
    error,
    pending,
    reset,
  }
}
