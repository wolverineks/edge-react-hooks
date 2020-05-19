import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useRecovery2Questions = (context: EdgeContext, recovery2Key: string, username: string) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string[]>({ pending: true })

  React.useEffect(() => {
    context
      .fetchRecovery2Questions(recovery2Key, username)
      .then((messages: any) => onSuccess(messages))
      .catch(onError)
  }, [context, onError, onSuccess, recovery2Key, username])

  return {
    questions: data,
    error,
    pending,
  }
}
