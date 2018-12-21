// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeAccount, 'otpResetDate'> | null

export const useOtpResetDate = (account: EdgeAccount | null | void) => {
  const [otpResetDate, setOtpResetDate] = useState<State>(account ? account.otpResetDate : null)

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
