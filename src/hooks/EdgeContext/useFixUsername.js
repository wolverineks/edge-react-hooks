// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFixUsername = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fixUsername = (context: EdgeContext, username: string) => {
    onStart()
    Promise.resolve(context.fixUsername(username))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    fixUsername,
    pending,
    reset,
    username: data,
  }
}
