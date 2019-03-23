// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLogout = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const logout = (account: EdgeAccount) => {
    onStart()
    return account
      .logout()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    logout,
    pending,
    reset,
  }
}
