// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type DeleteLocalUserStart = {| type: 'DELETE_LOCAL_USER_START' |}
type DeleteLocalUserSuccess = {| type: 'DELETE_LOCAL_USER_SUCCESS' |}
type DeleteLocalUserError = {| error: Error, type: 'DELETE_LOCAL_USER_ERROR' |}

type Action = DeleteLocalUserStart | DeleteLocalUserSuccess | DeleteLocalUserError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DELETE_LOCAL_USER_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_LOCAL_USER_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_LOCAL_USER_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useDeleteLocalUser = (context: EdgeContext | null | void, username: string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const deleteLocalUser = () => {
    if (!context || !username) return
    dispatch({ type: 'DELETE_LOCAL_USER_START' })
    context
      .deleteLocalAccount(username)
      .then(() => dispatch({ type: 'DELETE_LOCAL_USER_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DELETE_LOCAL_USER_ERROR', error }))
  }

  return { ...state, deleteLocalUser }
}
