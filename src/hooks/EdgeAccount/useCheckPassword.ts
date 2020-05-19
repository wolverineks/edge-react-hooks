import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useCheckPassword = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<boolean>()

  const checkPassword = React.useCallback(
    (...args: Parameters<EdgeAccount['checkPassword']>) => {
      onStart()
      account
        .checkPassword(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    checkPassword,
    error,
    passwordVerified: data,
    pending,
    reset,
  }
}
