// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type EnableOtpStart = {| type: 'ENABLE_OTP_START' |}
type EnableOtpSuccess = {| type: 'ENABLE_OTP_SUCCESS' |}
type EnableOtpError = {| error: Error, type: 'ENABLE_OTP_ERROR' |}

type Action = EnableOtpStart | EnableOtpSuccess | EnableOtpError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ENABLE_OTP_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENABLE_OTP_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ENABLE_OTP_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useEnableOtp = (account: EdgeAccount | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enableOtp = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'ENABLE_OTP_START' })
    account
      .enableOtp()
      .then(() => dispatch({ type: 'ENABLE_OTP_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ENABLE_OTP_ERROR', error }))
  }

  return { ...state, enableOtp }
}
