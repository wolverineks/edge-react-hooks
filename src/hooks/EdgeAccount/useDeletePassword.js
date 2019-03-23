// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDeletePassword = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const deletePassword = (account: EdgeAccount) => {
    onStart()
    account
      .deletePassword()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    deletePassword,
    error,
    pending,
    reset,
  }
}
