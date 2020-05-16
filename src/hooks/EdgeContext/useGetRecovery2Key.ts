import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useGetRecovery2Key = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getRecovery2Key = React.useCallback(
    (...args: Parameters<EdgeContext['getRecovery2Key']>) => {
      onStart()
      context
        .getRecovery2Key(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    getRecovery2Key,
    error,
    pending,
    reset,
  }
}
