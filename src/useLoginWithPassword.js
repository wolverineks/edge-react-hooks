// @flow

import { type EdgeAccount, type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type LoginStart = {| type: 'LOGIN_START' |}
type LoginSuccess = {| account: EdgeAccount, type: 'LOGIN_SUCCESS' |}
type LoginError = {| error: Error, type: 'LOGIN_ERROR' |}

type Action = LoginStart | LoginSuccess | LoginError

type State = {| account: EdgeAccount | null, error: Error | null, pending: boolean |}

const initialState: State = { account: null, error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, pending: false, account: action.account }
    }
    case 'LOGIN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useLoginWithPassword = (
  context: EdgeContext | null | void,
  username: string | null | void,
  password: string | null | void,
  options: EdgeAccountOptions | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loginWithPassword = () => {
    if (!context || !username || !password) return
    dispatch({ type: 'LOGIN_START' })
    context
      .loginWithPassword(username, password, options || undefined)
      .then((account: EdgeAccount) => dispatch({ type: 'LOGIN_SUCCESS', account }))
      .catch((error: Error) => dispatch({ type: 'LOGIN_ERROR', error }))
  }

  return { ...state, loginWithPassword }
}
