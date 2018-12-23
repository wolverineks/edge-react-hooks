// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useState } from 'react'

export const useFiatCurrencyCode = (wallet: EdgeCurrencyWallet | null | void) => {
  const [fiatCurrencyCode, setFiatCurrencyCode] = useState(null)

  const effect = () => {
    if (!wallet) return // mount with null
    setFiatCurrencyCode(wallet.fiatCurrencyCode)
    const unsubscribe = wallet.watch('fiatCurrencyCode', setFiatCurrencyCode) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return fiatCurrencyCode
}
