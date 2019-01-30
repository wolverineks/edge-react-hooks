// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type LogoutStart = {| type: 'LOGOUT_START' |}
type LogoutSuccess = {| type: 'LOGOUT_SUCCESS' |}
type LogoutError = {| error: Error, type: 'LOGOUT_ERROR' |}

type Action = LogoutStart | LogoutSuccess | LogoutError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGOUT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOGOUT_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'LOGOUT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useLogout = (account: ?EdgeAccount) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const logout = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'LOGOUT_START' })
    account
      .logout()
      .then(() => dispatch({ type: 'LOGOUT_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'LOGOUT_ERROR', error }))
  }

  return { ...state, logout }
}
