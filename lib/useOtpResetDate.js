// @flow

import { useEffect, useState } from 'react'

// import { type EdgeAccount } from 'edge-core-js'
import { type EdgeAccount } from './types.js' // HACK: Remove these types when edge-core-js upgrades to flow-bin ^0.79.0

export const useOtpResetDate = (account: EdgeAccount | null | void) => {
  const [otpResetDate, setOtpResetDate] = useState(
    account ? account.otpResetDate : []
  )

  const effect = () => {
    if (!account) return // mount with null
    setOtpResetDate(account.otpResetDate) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('otpResetDate', setOtpResetDate) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return otpResetDate
}