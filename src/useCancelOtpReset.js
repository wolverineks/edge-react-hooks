// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type CancelOtpResetStart = {| type: 'CANCEL_OTP_RESET_START' |}
type CancelOtpResetSuccess = {| type: 'CANCEL_OTP_RESET_SUCCESS' |}
type CancelOtpResetError = {| error: Error, type: 'CANCEL_OTP_RESET_ERROR' |}

type Action = CancelOtpResetStart | CancelOtpResetSuccess | CancelOtpResetError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CANCEL_OTP_RESET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CANCEL_OTP_RESET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CANCEL_OTP_RESET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useCancelOtpReset = (account: ?EdgeAccount) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const cancelOtpReset = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'CANCEL_OTP_RESET_START' })
    account
      .cancelOtpReset()
      .then(() => dispatch({ type: 'CANCEL_OTP_RESET_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CANCEL_OTP_RESET_ERROR', error }))
  }

  return { ...state, cancelOtpReset }
}
