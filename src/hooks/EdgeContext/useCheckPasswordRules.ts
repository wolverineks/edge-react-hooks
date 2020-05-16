import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeContext } from '../../types'

export const useCheckPasswordRules = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

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
