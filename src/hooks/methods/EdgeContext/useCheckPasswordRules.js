// @flow

import { type EdgeContext, type EdgePasswordRules } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCheckPasswordRules = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const checkPasswordRules = (context: EdgeContext, password: string) => {
    onStart()
    return Promise.resolve(context.checkPasswordRules(password))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    checkPasswordRules,
    error,
    passwordRules: (data: ?EdgePasswordRules),
    pending,
  }
}
