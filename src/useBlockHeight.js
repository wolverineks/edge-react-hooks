// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeCurrencyWallet, 'blockHeight'> | null

export const useBlockHeight = (wallet: EdgeCurrencyWallet | null | void) => {
  const [blockHeight, setBlockHeight] = useState<State>(wallet ? wallet.blockHeight : null)

  const effect = () => {
    if (!wallet) return // mount with null
    setBlockHeight(wallet.blockHeight)
    const unsubscribe = wallet.watch('blockHeight', setBlockHeight) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return blockHeight
}
