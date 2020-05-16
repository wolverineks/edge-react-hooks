import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useFetchRecovery2Questions = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fetchRecovery2Questions = React.useCallback(
    (...args: Parameters<EdgeContext['fetchRecovery2Questions']>) => {
      onStart()
      context
        .fetchRecovery2Questions(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    fetchRecovery2Questions,
    error,
    pending,
    reset,
  }
}
