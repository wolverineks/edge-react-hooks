// @flow

import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithRecovery2 = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const loginWithRecovery2 = (
    context: EdgeContext,
    recovery2Key: string,
    username: string,
    answers: Array<string>,
    options: EdgeAccountOptions,
  ) => {
    onStart()
    return context
      .loginWithRecovery2(recovery2Key, username, answers, options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    account: data,
    error,
    loginWithRecovery2,
    pending,
    reset,
  }
}
