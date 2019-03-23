// @flow

import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithPassword = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const loginWithPassword = (context: EdgeContext, username: string, password: string, options: EdgeAccountOptions) => {
    onStart()
    context
      .loginWithPassword(username, password, options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    account: data,
    error,
    loginWithPassword,
    pending,
    reset,
  }
}
