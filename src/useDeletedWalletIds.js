// @flow

import { type EdgeAccount, type EdgeWalletInfoFull } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = Array<string> | null
type SetState = (State | (State => State)) => void

export const useDeletedWalletIds = (account: EdgeAccount | null | void) => {
  const [deletedWalletIds, setDeletedWalletIds]: [State, SetState] = useState(
    account ? getDeletedWalletIds(account.allKeys) : null
  )

  const effect = () => {
    if (!account) return // mount with null
    setDeletedWalletIds(getDeletedWalletIds(account.allKeys)) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('allKeys', allKeys => setDeletedWalletIds(getDeletedWalletIds(allKeys))) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return deletedWalletIds
}

const getDeletedWalletIds = (walletInfos: Array<EdgeWalletInfoFull>) => {
  const deletedWalletInfos: Array<EdgeWalletInfoFull> = walletInfos.filter(key => key.deleted)
  const deletedWalletIds: Array<string> = deletedWalletInfos.map((key: EdgeWalletInfoFull) => key.id)

  return deletedWalletIds
}
