import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const usePinLoginEnabled = (context: EdgeContext, username: string) => {
  const { onSuccess, onError, pending, error, data } = useAsync<boolean>({ pending: true })

  React.useEffect(() => {
    context
      .pinLoginEnabled(username)
      .then((messages: any) => onSuccess(messages))
      .catch(onError)
  }, [context, onError, onSuccess, username])

  return {
    pinLoginEnabled: data,
    error,
    pending,
  }
}
