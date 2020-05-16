import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useFixUsername = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fixUsername = React.useCallback(
    (...args: Parameters<EdgeContext['fixUsername']>) => {
      onStart()
      Promise.resolve(context.fixUsername(...args))
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    error,
    fixUsername,
    pending,
    reset,
    username: data,
  }
}
