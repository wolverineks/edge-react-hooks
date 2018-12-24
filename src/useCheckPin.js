// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type CheckPinStart = {| type: 'CHECK_PIN_START' |}
type CheckPinSuccess = {| pinVerified: boolean, type: 'CHECK_PIN_SUCCESS' |}
type CheckPinError = {| error: Error, type: 'CHECK_PIN_ERROR' |}

type Action = CheckPinStart | CheckPinSuccess | CheckPinError

type State = {| error: Error | null, pending: boolean, pinVerified: boolean | null |}

const initialState: State = { error: null, pending: false, pinVerified: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHECK_PIN_START': {
      return { ...state, pending: true, error: null, pinVerified: null }
    }
    case 'CHECK_PIN_SUCCESS': {
      return { ...state, pending: false, pinVerified: true }
    }
    case 'CHECK_PIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useCheckPin = (account: EdgeAccount | null | void, pin: string | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const checkPin = () => {
    if (!account || !pin) return
    dispatch({ type: 'CHECK_PIN_START' })
    account
      .checkPin(pin)
      .then((pinVerified: boolean) => dispatch({ type: 'CHECK_PIN_SUCCESS', pinVerified }))
      .catch((error: Error) => dispatch({ type: 'CHECK_PIN_ERROR', error }))
  }

  return { ...state, checkPin }
}
