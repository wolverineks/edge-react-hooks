// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCheckPassword = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const checkPassword = (account: EdgeAccount, password: string) => {
    onStart()
    account
      .checkPassword(password)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    checkPassword,
    error,
    passwordVerified: data,
    pending,
    reset,
  }
}
