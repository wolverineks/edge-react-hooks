// @flow

import { type EdgeContextOptions, makeEdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useMakeEdgeContext = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const _makeEdgeContext = (contextOptions: EdgeContextOptions) => {
    onStart()
    makeEdgeContext(contextOptions)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    context: data,
    error,
    makeEdgeContext: _makeEdgeContext,
    pending,
    reset,
  }
}
