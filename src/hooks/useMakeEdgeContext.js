// @flow

import { type EdgeContext, type EdgeContextOptions, makeEdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useMakeEdgeContext = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const _makeEdgeContext = (contextOptions: EdgeContextOptions) => {
    onStart()
    return makeEdgeContext(contextOptions)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    context: (data: ?EdgeContext),
    error,
    makeEdgeContext: _makeEdgeContext,
    pending,
  }
}
