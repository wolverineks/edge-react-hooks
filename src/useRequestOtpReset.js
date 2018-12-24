// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type RequestOtpResetStart = {| type: 'REQUEST_OTP_RESET_START' |}
type RequestOtpResetSuccess = {| type: 'REQUEST_OTP_RESET_SUCCESS' |}
type RequestOtpResetError = {| error: Error, type: 'REQUEST_OTP_RESET_ERROR' |}

type Action = RequestOtpResetStart | RequestOtpResetSuccess | RequestOtpResetError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'REQUEST_OTP_RESET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'REQUEST_OTP_RESET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'REQUEST_OTP_RESET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useRequestEdgeLogin = (
  context: EdgeContext | null | void,
  username: string | null | void,
  otpResetToken: string | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const requestEdgeLogin = () => {
    if (!context || !username || !otpResetToken) return
    dispatch({ type: 'REQUEST_OTP_RESET_START' })
    context
      .requestOtpReset(username, otpResetToken)
      .then((resetDate: Date) => dispatch({ type: 'REQUEST_OTP_RESET_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'REQUEST_OTP_RESET_ERROR', error }))
  }

  return { ...state, requestEdgeLogin }
}
