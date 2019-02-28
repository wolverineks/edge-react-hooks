// @flow

import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCreateAccount = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

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

  return { createAccount, ...rest }
}
