// @flow

import { type EdgeAccount, type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithKey = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const loginWithKey = (context: EdgeContext, username: string, loginKey: string, options: EdgeAccountOptions) => {
    onStart()
    return context
      .loginWithKey(username, loginKey, options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    account: (data: ?EdgeAccount),
    error,
    loginWithKey,
    pending,
    reset,
  }
}
