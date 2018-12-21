// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeAccount, 'activeWalletIds'> | null

export const useActiveWalletIds = (account: EdgeAccount | null | void) => {
  const [activeWalletIds, setActiveWalletIds] = useState<State>(account ? account.archivedWalletIds : null)

  const effect = () => {
    if (!account) return // mount with null
    setActiveWalletIds(account.activeWalletIds) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('activeWalletIds', setActiveWalletIds) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return activeWalletIds
}
