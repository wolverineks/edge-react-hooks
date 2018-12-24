// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeAccount, 'currencyWallets'> | null
type SetState = (State | (State => State)) => void

export const useCurrencyWallets = (account: EdgeAccount | null | void) => {
  const [currencyWallets, setCurrencyWallets]: [State, SetState] = useState(null)

  const effect = () => {
    if (!account || !account.loggedIn) return // mount with null
    setCurrencyWallets(account.currencyWallets) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('currencyWallets', setCurrencyWallets) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return currencyWallets
}
