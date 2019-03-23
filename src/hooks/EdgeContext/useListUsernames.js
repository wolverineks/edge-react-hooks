// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListUsernames = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const listUsernames = (context: EdgeContext) => {
    onStart()
    context
      .listUsernames()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    listUsernames,
    pending,
    reset,
    usernames: data,
  }
}
