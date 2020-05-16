import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useCheckPassword = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

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
