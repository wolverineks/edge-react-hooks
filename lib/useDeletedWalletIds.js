// @flow

import { useEffect, useState } from 'react'

// import { type EdgeAccount } from 'edge-core-js'
import { type EdgeAccount, type EdgeWalletInfoFull } from './types.js' // HACK: Remove these types when edge-core-js upgrades to flow-bin ^0.79.0

const getDeletedWalletIds = (walletInfos: Array<EdgeWalletInfoFull>) => {
  const deletedWalletInfos: Array<EdgeWalletInfoFull> = walletInfos.filter(
    key => key.deleted
  )
  const deletedWalletIds: Array<string> = deletedWalletInfos.map(
    (key: EdgeWalletInfoFull) => key.id
  )

  return deletedWalletIds
}

export const useDeletedWalletIds = (account: EdgeAccount | null | void) => {
  const initialState = account ? getDeletedWalletIds(account.allKeys) : []
  const [deletedWalletIds, setDeletedWalletIds] = useState(initialState)

  const effect = () => {
    if (!account) return // mount with null
    setDeletedWalletIds(getDeletedWalletIds(account.allKeys)) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('allKeys', allKeys => {
      setDeletedWalletIds(getDeletedWalletIds(allKeys))
    }) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return deletedWalletIds
}
