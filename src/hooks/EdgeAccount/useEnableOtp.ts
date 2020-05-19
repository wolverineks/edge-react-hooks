import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useEnableOtp = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const enableOtp = React.useCallback(
    (...args: Parameters<EdgeAccount['enableOtp']>) => {
      onStart()
      account
        .enableOtp(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    enableOtp,
    error,
    pending,
    reset,
  }
}
