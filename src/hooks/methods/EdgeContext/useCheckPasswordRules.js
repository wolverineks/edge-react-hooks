// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCheckPasswordRules = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const checkPasswordRules = (context: EdgeContext, password: string) => {
    onStart()
    return Promise.resolve(context.checkPasswordRules(password))
      .then(onSuccess)
      .catch(onError)
  }

  return { checkPasswordRules, ...rest }
}
