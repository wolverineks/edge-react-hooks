// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useClose = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const close = (context: EdgeContext) => {
    onStart()
    return context
      .close()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    close,
    error,
    pending,
  }
}
