// @flow

import { type EdgeContext, type EdgeEdgeLoginOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRequestEdgeLogin = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const requestEdgeLogin = (context: EdgeContext, options: EdgeEdgeLoginOptions) => {
    onStart()
    context
      .requestEdgeLogin(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    pendingLogin: data,
    requestEdgeLogin,
    reset,
  }
}
