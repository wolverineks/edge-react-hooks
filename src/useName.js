// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeCurrencyWallet, 'name'> | null
type SetState = (State | (State => State)) => void

export const useName = (wallet: EdgeCurrencyWallet | null | void) => {
  const [name, setName]: [State, SetState] = useState(wallet ? wallet.name : null)

  const effect = () => {
    if (!wallet) return // mount with null
    setName(wallet.name) // mount with wallet / null -> wallet / walletA -> walletB (2)
    const unsubscribe = wallet.watch('name', setName) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return name
}
