import { EdgeAccount, EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useCreateAccount = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<EdgeAccount>()

  const createAccount = React.useCallback(
    (...args: Parameters<EdgeContext['createAccount']>) => {
      onStart()
      context
        .createAccount(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    createAccount,
    error,
    pending,
    reset,
  }
}
