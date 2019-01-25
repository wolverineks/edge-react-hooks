// @flow

import { type EdgeContext, type EdgeContextOptions, makeEdgeContext } from 'edge-core-js'
import { useEffect, useState } from 'react'

export const useMakeEdgeContext = (contextOptions: EdgeContextOptions) => {
  const [state, setState] = useState({ context: null, pending: false, error: null })
  useEffect(() => {
    setState(state => ({ ...state, error: null, pending: true }))
    makeEdgeContext(contextOptions)
      .then((context: EdgeContext) => setState(state => ({ ...state, pending: false, context })))
      .catch((error: Error) => setState(state => ({ ...state, pending: false, error })))
  }, [])

  return state
}
