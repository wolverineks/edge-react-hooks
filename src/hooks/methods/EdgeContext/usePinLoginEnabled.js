// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const usePinLoginEnabled = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const pinLoginEnabled = (context: EdgeContext, username: string) => {
    onStart()
    return context
      .pinLoginEnabled(username)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    enabled: (data: ?boolean),
    error,
    pending,
    pinLoginEnabled,
    reset,
  }
}
