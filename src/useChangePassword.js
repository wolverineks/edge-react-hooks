// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type ChangePasswordStart = {| type: 'CHANGE_PASSWORD_START' |}
type ChangePasswordSuccess = {| type: 'CHANGE_PASSWORD_SUCCESS' |}
type ChangePasswordError = {| error: Error, type: 'CHANGE_PASSWORD_ERROR' |}

type Action = ChangePasswordStart | ChangePasswordSuccess | ChangePasswordError

type State = {| error: Error | null, pending: boolean |}

const initialState = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_PASSWORD_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_PASSWORD_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useChangePassword = (account: EdgeAccount | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changePassword = (password: string) => {
    if (!account || !password) return
    dispatch({ type: 'CHANGE_PASSWORD_START' })
    account
      .changePassword(password)
      .then(() => dispatch({ type: 'CHANGE_PASSWORD_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CHANGE_PASSWORD_ERROR', error }))
  }

  return { ...state, changePassword }
}
