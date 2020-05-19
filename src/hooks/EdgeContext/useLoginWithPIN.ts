import { EdgeAccount, EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useLoginWithPIN = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<EdgeAccount>()

  const loginWithPIN = React.useCallback(
    (...args: Parameters<EdgeContext['loginWithPIN']>) => {
      onStart()
      context
        .loginWithPIN(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    loginWithPIN,
    error,
    pending,
    reset,
  }
}
