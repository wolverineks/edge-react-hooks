// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDeleteLocalAccount = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const deleteLocalAccount = (context: EdgeContext, username: string) => {
    onStart()
    return context
      .deleteLocalAccount(username)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    deleteLocalAccount,
    error,
    pending,
  }
}
