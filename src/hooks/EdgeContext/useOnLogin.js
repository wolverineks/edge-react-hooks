// @flow

import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import { useEffect } from 'react'

export const useOnLogin = (context: EdgeContext, callback: (account: EdgeAccount) => any) => {
  useEffect(() => {
    const unsubscribe = context.on('login', callback)

    return () => {
      unsubscribe
    }
  }, [context, callback])

  return void 0
}
