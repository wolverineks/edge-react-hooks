// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type DeletePasswordStart = {| type: 'DELETE_PASSWORD_START' |}
type DeletePasswordSuccess = {| type: 'DELETE_PASSWORD_SUCCESS' |}
type DeletePasswordError = {| error: Error, type: 'DELETE_PASSWORD_ERROR' |}

type Action = DeletePasswordStart | DeletePasswordSuccess | DeletePasswordError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DELETE_PASSWORD_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_PASSWORD_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_PASSWORD_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useDeletePassword = (account: ?EdgeAccount) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const deletePassword = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'DELETE_PASSWORD_START' })
    account
      .deletePassword()
      .then(() => dispatch({ type: 'DELETE_PASSWORD_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DELETE_PASSWORD_ERROR', error }))
  }

  return { ...state, deletePassword }
}
