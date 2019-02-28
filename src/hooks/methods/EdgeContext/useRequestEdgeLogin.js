// @flow

import { type EdgeContext, type EdgeEdgeLoginOptions, type EdgePendingEdgeLogin } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRequestEdgeLogin = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const requestEdgeLogin = (context: EdgeContext, options: EdgeEdgeLoginOptions) => {
    onStart()
    return context
      .requestEdgeLogin(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    pendingLogin: (data: ?EdgePendingEdgeLogin),
    requestEdgeLogin,
  }
}
