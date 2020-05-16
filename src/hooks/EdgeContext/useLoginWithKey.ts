import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useLoginWithKey = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const loginWithKey = React.useCallback(
    (...args: Parameters<EdgeContext['loginWithKey']>) => {
      onStart()
      context
        .loginWithKey(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    loginWithKey,
    error,
    pending,
    reset,
  }
}
