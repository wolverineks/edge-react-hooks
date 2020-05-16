import * as React from 'react'
import { EdgeContext, EdgeContextEvents } from '../../types'

export const useOnError = (context: EdgeContext, callback: (response: EdgeContextEvents['error']) => any) => {
  React.useEffect(() => {
    const unsubscribe = context.on('error', callback as any)

    return () => {
      unsubscribe
    }
  }, [context, callback])
}

export const useOnLogin = (context: EdgeContext, callback: (response: EdgeContextEvents['login']) => any) => {
  React.useEffect(() => {
    const unsubscribe = context.on('login', callback as any)

    return () => {
      unsubscribe
    }
  }, [context, callback])
}

export const useOnLoginError = (context: EdgeContext, callback: (response: EdgeContextEvents['loginError']) => any) => {
  React.useEffect(() => {
    const unsubscribe = context.on('loginError', callback as any)

    return () => {
      unsubscribe
    }
  }, [context, callback])
}

export const useOnLoginStart = (context: EdgeContext, callback: (response: EdgeContextEvents['loginStart']) => any) => {
  React.useEffect(() => {
    const unsubscribe = context.on('loginStart', callback as any)

    return () => {
      unsubscribe
    }
  }, [context, callback])

  return void 0
}
