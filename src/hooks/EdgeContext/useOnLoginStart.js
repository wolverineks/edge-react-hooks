// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEffect } from 'react'

export const useOnLoginStart = (context: EdgeContext, callback: ({ username: string }) => any) => {
  useEffect(() => {
    const unsubscribe = context.on('loginStart', callback)

    return () => {
      unsubscribe
    }
  }, [context, callback])

  return void 0
}
