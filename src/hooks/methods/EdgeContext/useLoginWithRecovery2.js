// @flow

import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLoginWithRecovery2 = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

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

  return { loginWithRecovery2, ...rest }
}
