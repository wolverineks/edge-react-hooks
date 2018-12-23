// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type DeletePinStart = {| type: 'DELETE_PIN_START' |}
type DeletePinSuccess = {| type: 'DELETE_PIN_SUCCESS' |}
type DeletePinError = {| error: Error, type: 'DELETE_PIN_ERROR' |}

type Action = DeletePinStart | DeletePinSuccess | DeletePinError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DELETE_PIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_PIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_PIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useDeletePin = (account: EdgeAccount | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enablePinLogin = () => {
    if (!account) return
    dispatch({ type: 'DELETE_PIN_START' })
    account
      .deletePin()
      .then(() => dispatch({ type: 'DELETE_PIN_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DELETE_PIN_ERROR', error }))
  }

  return { ...state, enablePinLogin }
}
