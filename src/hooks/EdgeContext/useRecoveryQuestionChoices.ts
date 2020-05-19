import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useRecoveryQuestionChoices = (context: EdgeContext) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string[]>()

  React.useEffect(() => {
    context.listRecoveryQuestionChoices().then(onSuccess).catch(onError)
  }, [context, onError, onSuccess])

  return {
    choices: data,
    error,
    pending,
  }
}
