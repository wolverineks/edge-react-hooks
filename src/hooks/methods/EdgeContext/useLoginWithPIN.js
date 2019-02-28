// @flow

import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithPIN = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const loginWithPIN = (context: EdgeContext, username: string, pin: string, options: EdgeAccountOptions) => {
    onStart()
    return context
      .loginWithPIN(username, pin, options)
      .then(onSuccess)
      .catch(onError)
  }

  return { loginWithPIN, ...rest }
}
