// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useChangeRecovery = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const changeRecovery = (account: EdgeAccount, questions: Array<string>, answers: Array<string>) => {
    onStart()
    return account
      .changeRecovery(questions, answers)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    changeRecovery,
    error,
    pending,
    recovery: data,
    reset,
  }
}
