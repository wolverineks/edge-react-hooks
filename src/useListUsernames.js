// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type ListUsernamesStart = {| type: 'READ_USERNAMES_START' |}
type ListUsernamesSuccess = {| type: 'READ_USERNAMES_SUCCESS', usernames: Array<string> |}
type ListUsernamesError = {| error: Error, type: 'READ_USERNAMES_ERROR' |}

type Action = ListUsernamesStart | ListUsernamesSuccess | ListUsernamesError

type State = {| error: Error | null, pending: boolean, usernames: Array<string> | null |}

const initialState: State = { pending: false, error: null, usernames: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_USERNAMES_START': {
      return { ...state, pending: true, error: null, usernames: null }
    }
    case 'READ_USERNAMES_SUCCESS': {
      return { ...state, pending: false, usernames: action.usernames }
    }
    case 'READ_USERNAMES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useListUsernames = (context: ?EdgeContext) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const listUsernames = () => {
    if (!context) return
    dispatch({ type: 'READ_USERNAMES_START' })
    context
      .listUsernames()
      .then((usernames: Array<string>) => dispatch({ type: 'READ_USERNAMES_SUCCESS', usernames }))
      .catch((error: Error) => dispatch({ type: 'READ_USERNAMES_ERROR', error }))
  }

  return { ...state, listUsernames }
}
