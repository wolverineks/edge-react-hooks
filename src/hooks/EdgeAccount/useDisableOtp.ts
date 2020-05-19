import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useDisableOtp = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const disableOtp = React.useCallback(
    (...args: Parameters<EdgeAccount['disableOtp']>) => {
      onStart()
      account
        .disableOtp(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    disableOtp,
    error,
    pending,
    reset,
  }
}
