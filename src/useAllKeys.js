// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeAccount, 'allKeys'> | null
type SetState = (State | (State => State)) => void

export const useAllKeys = (account: EdgeAccount | null | void) => {
  const [allKeys, setAllKeys]: [State, SetState] = useState(null)

  const effect = () => {
    if (!account) return // mount with null
    setAllKeys(account.allKeys) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('allKeys', setAllKeys) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return allKeys
}
