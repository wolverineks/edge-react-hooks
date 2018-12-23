// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type DisablePinLoginStart = {| type: 'DISABLE_PIN_LOGIN_START' |}
type DisablePinLoginSuccess = {| type: 'DISABLE_PIN_LOGIN_SUCCESS' |}
type DisablePinLoginError = {| error: Error, type: 'DISABLE_PIN_LOGIN_ERROR' |}

type Action = DisablePinLoginStart | DisablePinLoginSuccess | DisablePinLoginError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DISABLE_PIN_LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DISABLE_PIN_LOGIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DISABLE_PIN_LOGIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useDisablePinLogin = (account: EdgeAccount | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const disablePinLogin = (pin: string) => {
    if (!account || !pin) return
    dispatch({ type: 'DISABLE_PIN_LOGIN_START' })
    account
      .changePin({ enableLogin: false })
      .then(() => dispatch({ type: 'DISABLE_PIN_LOGIN_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DISABLE_PIN_LOGIN_ERROR', error }))
  }

  return { ...state, disablePinLogin }
}
