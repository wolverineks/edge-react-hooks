import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useChangePassword = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const changePassword = React.useCallback(
    (...args: Parameters<EdgeAccount['changePassword']>) => {
      onStart()
      account
        .changePassword(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    changePassword,
    error,
    pending,
    reset,
  }
}
