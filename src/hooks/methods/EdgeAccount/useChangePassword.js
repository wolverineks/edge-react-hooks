// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useChangePassword = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const changePassword = (account: EdgeAccount, password: string) => {
    onStart()
    return account
      .changePassword(password)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    changePassword,
    error,
    pending,
  }
}
