// @flow

import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithKey = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const loginWithKey = (context: EdgeContext, username: string, loginKey: string, options: EdgeAccountOptions) => {
    onStart()
    return context
      .loginWithKey(username, loginKey, options)
      .then(onSuccess)
      .catch(onError)
  }

  return { loginWithKey, ...rest }
}
