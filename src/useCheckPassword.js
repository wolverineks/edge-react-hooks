// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type CheckPasswordStart = {| type: 'CHECK_PASSWORD_START' |}
type CheckPasswordSuccess = {| passwordVerified: boolean, type: 'CHECK_PASSWORD_SUCCESS' |}
type CheckPasswordError = {| error: Error, type: 'CHECK_PASSWORD_ERROR' |}

type Action = CheckPasswordStart | CheckPasswordSuccess | CheckPasswordError

type State = {| error: Error | null, passwordVerified: boolean | null, pending: boolean |}

const initialState: State = { pending: false, error: null, passwordVerified: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHECK_PASSWORD_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHECK_PASSWORD_SUCCESS': {
      return { ...state, pending: false, passwordVerified: action.passwordVerified }
    }
    case 'CHECK_PASSWORD_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useCheckPassword = (account: EdgeAccount | null | void, password: string | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const checkPassword = () => {
    if (!account || !account.loggedIn || !password) return
    dispatch({ type: 'CHECK_PASSWORD_START' })
    account
      .checkPassword(password)
      .then((passwordVerified: boolean) => dispatch({ type: 'CHECK_PASSWORD_SUCCESS', passwordVerified }))
      .catch((error: Error) => dispatch({ type: 'CHECK_PASSWORD_ERROR', error }))
  }

  return { ...state, checkPassword }
}
