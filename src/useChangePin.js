// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type ChangePinStart = {| type: 'CHANGE_PIN_START' |}
type ChangePinSuccess = {| type: 'CHANGE_PIN_SUCCESS' |}
type ChangePinError = {| error: Error, type: 'CHANGE_PIN_ERROR' |}

type Action = ChangePinStart | ChangePinSuccess | ChangePinError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_PIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_PIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_PIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useChangePin = (account: ?EdgeAccount, pin: ?string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changePin = () => {
    if (!account || !account.loggedIn || !pin) return
    dispatch({ type: 'CHANGE_PIN_START' })
    account
      .changePin({ pin })
      .then(() => dispatch({ type: 'CHANGE_PIN_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CHANGE_PIN_ERROR', error }))
  }

  return { ...state, changePin }
}
