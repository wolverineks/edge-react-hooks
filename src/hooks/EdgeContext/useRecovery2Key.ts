import { EdgeContext, EdgeLoginMessages } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useRecovery2Key = (context: EdgeContext, username: string) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgeLoginMessages>({ pending: true })

  React.useEffect(() => {
    context
      .getRecovery2Key(username)
      .then((messages: any) => onSuccess(messages))
      .catch(onError)
  }, [context, onError, onSuccess, username])

  return {
    recovery2Key: data,
    error,
    pending,
  }
}
