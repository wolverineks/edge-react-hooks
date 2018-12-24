// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type CheckPinLoginEnabledStart = {| type: 'CHECK_PIN_LOGIN_ENABLED_START' |}
type CheckPinLoginEnabledSuccess = {| pinLoginEnabled: boolean, type: 'CHECK_PIN_LOGIN_ENABLED_SUCCESS' |}
type CheckPinLoginEnabledError = {| error: Error, type: 'CHECK_PIN_LOGIN_ENABLED_ERROR' |}

type Action = CheckPinLoginEnabledStart | CheckPinLoginEnabledSuccess | CheckPinLoginEnabledError

type State = {| error: Error | null, pending: boolean, pinLoginEnabled: boolean | null |}

const initialState: State = { pending: false, error: null, pinLoginEnabled: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHECK_PIN_LOGIN_ENABLED_START': {
      return { ...state, pending: true, error: null, pinLoginEnabled: null }
    }
    case 'CHECK_PIN_LOGIN_ENABLED_SUCCESS': {
      return { ...state, pending: false, pinLoginEnabled: action.pinLoginEnabled }
    }
    case 'CHECK_PIN_LOGIN_ENABLED_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useCheckPinLoginEnabled = (context: EdgeContext | null | void, username: string | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const checkPinLoginEnabled = () => {
    if (!context || !username) return
    dispatch({ type: 'CHECK_PIN_LOGIN_ENABLED_START' })
    context
      .pinLoginEnabled(username)
      .then((pinLoginEnabled: boolean) => dispatch({ type: 'CHECK_PIN_LOGIN_ENABLED_SUCCESS', pinLoginEnabled }))
      .catch((error: Error) => dispatch({ type: 'CHECK_PIN_LOGIN_ENABLED_ERROR', error }))
  }

  return { ...state, checkPinLoginEnabled }
}
