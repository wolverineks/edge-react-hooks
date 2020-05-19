import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useCheckPasswordRules = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<
    ReturnType<EdgeContext['checkPasswordRules']>
  >()

  const checkPasswordRules = React.useCallback(
    (...args: Parameters<EdgeContext['checkPasswordRules']>) => {
      onStart()
      Promise.resolve(context.checkPasswordRules(...args))
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    checkPasswordRules,
    error,
    passwordRules: data,
    pending,
    reset,
  }
}
