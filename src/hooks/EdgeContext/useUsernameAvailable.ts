import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useUsernameAvailable = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const usernameAvailable = React.useCallback(
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
    account: data,
    usernameAvailable,
    error,
    pending,
    reset,
  }
}
