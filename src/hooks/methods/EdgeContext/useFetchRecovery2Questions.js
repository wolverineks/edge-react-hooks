// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchRecovery2Questions = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const fetchRecovery2Questions = (context: EdgeContext, recovery2Key: string, username: string) => {
    onStart()
    return context
      .fetchRecovery2Questions(recovery2Key, username)
      .then(onSuccess)
      .catch(onError)
  }

  return { fetchRecovery2Questions, ...rest }
}
