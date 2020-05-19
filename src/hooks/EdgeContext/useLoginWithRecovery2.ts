import { EdgeAccount, EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useLoginWithRecovery2 = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<EdgeAccount>()

  const loginWithRecovery2 = React.useCallback(
    (...args: Parameters<EdgeContext['loginWithRecovery2']>) => {
      onStart()
      context
        .loginWithRecovery2(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    loginWithRecovery2,
    error,
    pending,
    reset,
  }
}
