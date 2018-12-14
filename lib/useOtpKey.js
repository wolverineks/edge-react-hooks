// @flow

import { useEffect, useState } from 'react'

// import { type EdgeAccount } from 'edge-core-js'
import { type EdgeAccount } from './types.js' // HACK: Remove these types when edge-core-js upgrades to flow-bin ^0.79.0

export const useOtpKey = (account: EdgeAccount | null | void) => {
  const [otpKey, setOtpKey] = useState(account ? account.otpKey : [])

  const effect = () => {
    if (!account) return // mount with null
    setOtpKey(account.otpKey) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('otpKey', setOtpKey) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return otpKey
}
