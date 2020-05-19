import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useFixUsername = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<string>()

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
