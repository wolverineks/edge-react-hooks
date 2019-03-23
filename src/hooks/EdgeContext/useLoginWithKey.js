// @flow

import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithKey = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const loginWithKey = (context: EdgeContext, username: string, loginKey: string, options: EdgeAccountOptions) => {
    onStart()
    context
      .loginWithKey(username, loginKey, options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    account: data,
    error,
    loginWithKey,
    pending,
    reset,
  }
}
