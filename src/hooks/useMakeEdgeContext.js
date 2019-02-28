// @flow

import { type EdgeContextOptions, makeEdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useMakeEdgeContext = (contextOptions: EdgeContextOptions) => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const _makeEdgeContext = () => {
    onStart()
    makeEdgeContext(contextOptions)
      .then(onSuccess)
      .catch(onError)
  }

  return { makeEdgeContext: _makeEdgeContext, ...rest }
}
