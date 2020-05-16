import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useListUsernames = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const listUsernames = React.useCallback(
    (...args: Parameters<EdgeContext['listUsernames']>) => {
      onStart()
      context
        .listUsernames(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    listUsernames,
    error,
    pending,
    reset,
  }
}
