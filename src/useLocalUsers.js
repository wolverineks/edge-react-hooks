// @flow

import { type EdgeContext } from 'edge-core-js'
import { useEffect, useState } from 'react'

export const useLocalUsers = (context: EdgeContext | null | void) => {
  const [localUsers, setLocalUsers] = useState(null)

  const effect = () => {
    if (!context) return // mount with null
    setLocalUsers(context.localUsers)
    const unsubscribe = context.watch('localUsers', setLocalUsers) // mount with context / null -> context / contextA -> contextB (2)
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [context]) // onUpdate

  return localUsers
}
