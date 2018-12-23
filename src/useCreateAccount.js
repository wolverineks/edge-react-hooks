// @flow

import { type EdgeAccount, type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type CreateAccountStart = {| type: 'CREATE_ACCOUNT_START' |}
type CreateAccountSuccess = {| account: EdgeAccount, type: 'CREATE_ACCOUNT_SUCCESS' |}
type CreateAccountError = {| error: Error, type: 'CREATE_ACCOUNT_ERROR' |}
type Action = CreateAccountStart | CreateAccountSuccess | CreateAccountError

type State = {| account: EdgeAccount | null, error: Error | null, pending: boolean |}

const initialState = { account: null, error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CREATE_ACCOUNT_SUCCESS': {
      return { ...state, pending: false, account: action.account }
    }
    case 'CREATE_ACCOUNT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useCreateAccount = (context: EdgeContext | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createAccount = (username: string, password?: string, pin?: string, options?: EdgeAccountOptions) => {
    if (!context) return
    dispatch({ type: 'CREATE_ACCOUNT_START' })
    context
      .createAccount(username, password, pin, options)
      .then((account: EdgeAccount) => dispatch({ type: 'CREATE_ACCOUNT_SUCCESS', account }))
      .catch((error: Error) => dispatch({ type: 'CREATE_ACCOUNT_ERROR', error }))
  }

  return { ...state, createAccount }
}
