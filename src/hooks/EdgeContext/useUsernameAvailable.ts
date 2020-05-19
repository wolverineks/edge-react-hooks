import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useUsernameAvailable = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<boolean>()

  const isUsernameAvailable = React.useCallback(
    (...args: Parameters<EdgeContext['usernameAvailable']>) => {
      onStart()
      context
        .usernameAvailable(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    usernameAvailable: data,
    isUsernameAvailable,
    error,
    pending,
    reset,
  }
}
