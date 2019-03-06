// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListRecoveryQuestionChoices = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const listRecoveryQuestionChoices = (context: EdgeContext) => {
    onStart()
    return context
      .listRecoveryQuestionChoices()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    listRecoveryQuestionChoices,
    pending,
    recoveryQuestionChoices: (data: ?Array<string>),
    reset,
  }
}
