import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useFetchLoginMessages = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fetchLoginMessages = React.useCallback(
    (...args: Parameters<EdgeContext['fetchLoginMessages']>) => {
      onStart()
      context
        .fetchLoginMessages(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    fetchLoginMessages,
    error,
    pending,
    reset,
  }
}
