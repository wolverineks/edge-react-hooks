import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useClose = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const close = React.useCallback(
    (...args: Parameters<EdgeContext['close']>) => {
      onStart()
      context
        .close(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    close,
    error,
    pending,
    reset,
  }
}
