// @flow

import { type EdgeAccount, type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCreateAccount = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const createAccount = (
    context: EdgeContext,
    username: string,
    password?: string,
    pin?: string,
    options?: EdgeAccountOptions,
  ) => {
    onStart()
    return context
      .createAccount(username, password, pin, options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    account: (data: ?EdgeAccount),
    createAccount,
    error,
    pending,
  }
}
