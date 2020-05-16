import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useListRecoveryQuestionChoices = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const listRecoveryQuestionChoices = React.useCallback(
    (...args: Parameters<EdgeContext['listRecoveryQuestionChoices']>) => {
      onStart()
      context
        .listRecoveryQuestionChoices(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    listRecoveryQuestionChoices,
    error,
    pending,
    reset,
  }
}
