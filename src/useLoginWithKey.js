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

export const useLoginWithKey = (
  context: ?EdgeContext,
  username: ?string,
  key: ?string,
  options: ?EdgeAccountOptions
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loginWithKey = () => {
    if (!context || !username || !key) return
    dispatch({ type: 'LOGIN_START' })
    context
      .loginWithKey(username, key, options || undefined)
      .then((account: EdgeAccount) => dispatch({ type: 'LOGIN_SUCCESS', account }))
      .catch((error: Error) => dispatch({ type: 'LOGIN_ERROR', error }))
  }

  return { ...state, loginWithKey }
}
