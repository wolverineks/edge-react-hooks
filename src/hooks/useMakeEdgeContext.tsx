import * as React from 'react'
import { useAsync } from 'react-use-async'
import { makeEdgeContext } from 'edge-core-js'
import { EdgeContext } from '../types'

export const useMakeEdgeContext = (...args: Parameters<typeof makeEdgeContext>) => {
  const { onStart, onSuccess, onError, reset, pending, error, data: context } = useAsync<EdgeContext>({ pending: true })

  React.useEffect(() => {
    onStart()
    makeEdgeContext(...args)
      .then(onSuccess)
      .catch(onError)
  }, [args, onError, onStart, onSuccess])

  return {
    context,
    error,
    pending,
    reset,
  }
}
