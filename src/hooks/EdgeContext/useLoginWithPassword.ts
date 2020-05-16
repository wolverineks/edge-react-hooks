import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useLoginWithPassword = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const loginWithPassword = React.useCallback(
    (...args: Parameters<EdgeContext['loginWithPassword']>) => {
      onStart()
      context
        .loginWithPassword(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    loginWithPassword,
    error,
    pending,
    reset,
  }
}
