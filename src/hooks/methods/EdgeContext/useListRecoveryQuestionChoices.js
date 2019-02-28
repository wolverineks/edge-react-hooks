// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListRecoveryQuestionChoices = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const listRecoveryQuestionChoices = (context: EdgeContext) => {
    onStart()
    return context
      .listRecoveryQuestionChoices()
      .then(onSuccess)
      .catch(onError)
  }

  return { listRecoveryQuestionChoices, ...rest }
}
