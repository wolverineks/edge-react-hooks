import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useCheckPin = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const checkPin = React.useCallback(
    (...args: Parameters<EdgeAccount['checkPin']>) => {
      onStart()
      account
        .checkPin(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    checkPin,
    error,
    pending,
    pinVerified: data,
    reset,
  }
}
