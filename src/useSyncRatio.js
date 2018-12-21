// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeCurrencyWallet, 'syncRatio'> | null

export const useSyncRatio = (wallet: EdgeCurrencyWallet | null | void) => {
  const [syncRatio, setSyncRatio] = useState<State>(wallet ? wallet.syncRatio : null)

  const effect = () => {
    if (!wallet) return // mount with null
    setSyncRatio(wallet.syncRatio)
    const unsubscribe = wallet.watch('syncRatio', setSyncRatio) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return syncRatio
}
