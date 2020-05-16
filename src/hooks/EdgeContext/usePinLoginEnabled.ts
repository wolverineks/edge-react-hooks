import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const usePinLoginEnabled = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const pinLoginEnabled = React.useCallback(
    (...args: Parameters<EdgeContext['pinLoginEnabled']>) => {
      onStart()
      context
        .pinLoginEnabled(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    pinLoginEnabled,
    error,
    pending,
    reset,
  }
}
