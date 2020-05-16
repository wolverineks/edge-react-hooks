import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useLogout = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const logout = React.useCallback(
    (...args: Parameters<EdgeAccount['logout']>) => {
      onStart()
      account
        .logout(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    logout,
    pending,
    reset,
  }
}
