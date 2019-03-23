// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEffect } from 'react'

export const useOnError = (context: EdgeContext, callback: (error: Error) => any) => {
  useEffect(() => {
    const unsubscribe = context.on('error', callback)

    return () => {
      unsubscribe
    }
  }, [context, callback])

  return void 0
}
