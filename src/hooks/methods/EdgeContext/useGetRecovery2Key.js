// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetRecovery2Key = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getRecovery2Key = (context: EdgeContext, username: string) => {
    onStart()
    return context
      .getRecovery2Key(username)
      .then(onSuccess)
      .catch(onError)
  }

  return { getRecovery2Key, ...rest }
}
