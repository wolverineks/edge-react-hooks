import { EdgeContext, EdgePendingEdgeLogin } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useRequestEdgeLogin = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<EdgePendingEdgeLogin>()

  const requestEdgeLogin = React.useCallback(
    (...args: Parameters<EdgeContext['requestEdgeLogin']>) => {
      onStart()
      context
        .requestEdgeLogin(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    pendingEdgeLogin: data,
    requestEdgeLogin,
    error,
    pending,
    reset,
  }
}
