import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useChangeWalletStates = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const changeWalletStates = React.useCallback(
    (...args: Parameters<EdgeAccount['changeWalletStates']>) => {
      onStart()
      account
        .changeWalletStates(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    changeWalletStates,
    error,
    pending,
    reset,
  }
}
