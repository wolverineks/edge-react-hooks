// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDeletePassword = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const deletePassword = (account: EdgeAccount) => {
    onStart()
    return account
      .deletePassword()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    deletePassword,
    error,
    pending,
  }
}
