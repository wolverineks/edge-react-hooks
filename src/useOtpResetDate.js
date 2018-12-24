// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeAccount, 'otpResetDate'> | null
type SetState = (State | (State => State)) => void

export const useOtpResetDate = (account: EdgeAccount | null | void) => {
  const [otpResetDate, setOtpResetDate]: [State, SetState] = useState(null)

  const effect = () => {
    if (!account || !account.loggedIn) return // mount with null
    setOtpResetDate(account.otpResetDate) // mount with account / null -> account / accountA -> accountB (2)
    const unsubscribe = account.watch('otpResetDate', setOtpResetDate) // mount with account / null -> account / accountA -> accountB (2)
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account]) // onUpdate

  return otpResetDate
}
