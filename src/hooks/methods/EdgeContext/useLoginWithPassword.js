// @flow

import { type EdgeAccount, type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithPassword = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const loginWithPassword = (context: EdgeContext, username: string, password: string, options: EdgeAccountOptions) => {
    onStart()
    return context
      .loginWithPassword(username, password, options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    account: (data: ?EdgeAccount),
    error,
    loginWithPassword,
    pending,
  }
}
