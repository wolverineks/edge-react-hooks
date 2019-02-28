// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFixUsername = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const fixUsername = (context: EdgeContext, username: string) => {
    onStart()
    return Promise.resolve(context.fixUsername(username))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    fixUsername,
    pending,
    username: data,
  }
}
