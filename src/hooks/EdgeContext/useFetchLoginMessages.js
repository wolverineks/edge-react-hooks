// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchLoginMessages = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fetchLoginMessages = (context: EdgeContext) => {
    onStart()
    return context
      .fetchLoginMessages()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    fetchLoginMessages,
    loginMessages: data,
    pending,
    reset,
  }
}
