// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useUsernameAvailable = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const usernameAvailable = (context: EdgeContext, username: string) => {
    onStart()
    return context
      .usernameAvailable(username)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    available: data,
    error,
    pending,
    usernameAvailable,
  }
}
