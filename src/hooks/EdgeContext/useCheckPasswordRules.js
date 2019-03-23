// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCheckPasswordRules = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const checkPasswordRules = (context: EdgeContext, password: string) => {
    onStart()
    Promise.resolve(context.checkPasswordRules(password))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    checkPasswordRules,
    error,
    passwordRules: data,
    pending,
    reset,
  }
}
