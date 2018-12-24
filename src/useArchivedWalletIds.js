// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeAccount, 'archivedWalletIds'> | null
type SetState = (State | (State => State)) => void

export const useArchivedWalletIds = (account: EdgeAccount | null | void) => {
  const [archivedWalletIds, setArchivedWalletIds]: [State, SetState] = useState(null)

  const effect = () => {
    if (!account) return // mount with null
    setArchivedWalletIds(account.archivedWalletIds) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('archivedWalletIds', setArchivedWalletIds) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return archivedWalletIds
}
