// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type DisableOtpStart = {| type: 'DISABLE_OTP_START' |}
type DisableOtpSuccess = {| type: 'DISABLE_OTP_SUCCESS' |}
type DisableOtpError = {| error: Error, type: 'DISABLE_OTP_ERROR' |}

type Action = DisableOtpStart | DisableOtpSuccess | DisableOtpError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DISABLE_OTP_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DISABLE_OTP_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DISABLE_OTP_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useDisableOtp = (account: ?EdgeAccount) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const disableOtp = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'DISABLE_OTP_START' })
    account
      .disableOtp()
      .then(() => dispatch({ type: 'DISABLE_OTP_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DISABLE_OTP_ERROR', error }))
  }

  return { ...state, disableOtp }
}
