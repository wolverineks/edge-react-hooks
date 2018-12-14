// @flow

import { useEffect, useState } from 'react'

// import { type EdgeContext } from 'edge-core-js'
import { type EdgeContext } from './types.js' // HACK: Remove these types when edge-core-js upgrades to flow-bin ^0.79.0

export const useLocalUsers = (context: EdgeContext | null | void) => {
  const [localUsers, setLocalUsers] = useState(
    context ? context.localUsers : []
  )

  const effect = () => {
    if (!context) return // mount with null
    const unsubscribe = context.watch('localUsers', setLocalUsers) // mount with context / null -> context / contextA -> contextB (2)
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [context]) // onUpdate

  return localUsers
}
