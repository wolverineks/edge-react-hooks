import { EdgeContext, EdgeLoginMessages } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useLoginMessages = (context: EdgeContext) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgeLoginMessages>({ pending: true })

  React.useEffect(() => {
    context
      .fetchLoginMessages()
      .then((messages: any) => onSuccess(messages))
      .catch(onError)
  }, [context, onError, onSuccess])

  return {
    loginMessages: data,
    error,
    pending,
  }
}
