// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeCurrencyWallet, 'balances'> | null

export const useBalances = (wallet: EdgeCurrencyWallet | null | void) => {
  const [balances, setBalances] = useState<State>(wallet ? wallet.balances : null)

  const effect = () => {
    if (!wallet) return // mount with null
    setBalances(wallet.balances)
    const unsubscribe = wallet.watch('balances', setBalances) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return balances
}
