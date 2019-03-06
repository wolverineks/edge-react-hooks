// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetRecovery2Key = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getRecovery2Key = (context: EdgeContext, username: string) => {
    onStart()
    return context
      .getRecovery2Key(username)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getRecovery2Key,
    pending,
    recovery2Key: (data: ?string),
    reset,
  }
}
