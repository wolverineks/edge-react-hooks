import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useDeleteLocalAccount = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const deleteLocalAccount = React.useCallback(
    (...args: Parameters<EdgeContext['deleteLocalAccount']>) => {
      onStart()
      context
        .deleteLocalAccount(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    deleteLocalAccount,
    error,
    pending,
    reset,
  }
}
