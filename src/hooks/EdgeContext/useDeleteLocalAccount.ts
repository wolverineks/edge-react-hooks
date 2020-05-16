import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useDeleteLocalAccount = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

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
    account: data,
    deleteLocalAccount,
    error,
    pending,
    reset,
  }
}
