// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useState } from 'react'

type State = $PropertyType<EdgeAccount, 'otpKey'> | null
type SetState = (State | (State => State)) => void

export const useOtpKey = (account: EdgeAccount | null | void) => {
  const [otpKey, setOtpKey]: [State, SetState] = useState(account ? account.otpKey : null)

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
