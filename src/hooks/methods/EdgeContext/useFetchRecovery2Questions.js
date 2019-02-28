// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchRecovery2Questions = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const fetchRecovery2Questions = (context: EdgeContext, recovery2Key: string, username: string) => {
    onStart()
    return context
      .fetchRecovery2Questions(recovery2Key, username)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    fetchRecovery2Questions,
    pending,
    recovery2Questions: data,
  }
}
