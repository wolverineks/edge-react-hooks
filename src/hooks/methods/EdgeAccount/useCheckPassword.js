// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCheckPassword = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const checkPassword = (account: EdgeAccount, password: string) => {
    onStart()
    return account
      .checkPassword(password)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    checkPassword,
    error,
    passwordVerified: (data: ?boolean),
    pending,
  }
}
