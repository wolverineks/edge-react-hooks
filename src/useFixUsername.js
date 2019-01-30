// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type FixUsernameStart = {| type: 'FIX_USERNAME_START' |}
type FixUsernameSuccess = {| type: 'FIX_USERNAME_SUCCESS', username: string |}
type FixUsernameError = {| error: Error, type: 'FIX_USERNAME_ERROR' |}

type Action = FixUsernameStart | FixUsernameSuccess | FixUsernameError

type State = {| error: Error | null, pending: boolean, username: string | null |}

const initialState: State = { pending: false, error: null, username: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FIX_USERNAME_START': {
      return { ...state, pending: true, error: null, username: null }
    }
    case 'FIX_USERNAME_SUCCESS': {
      return { ...state, pending: false, username: action.username }
    }
    case 'FIX_USERNAME_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useFixUsername = (context: ?EdgeContext, username: ?string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fixUsername = () => {
    if (!context || !username) return
    dispatch({ type: 'FIX_USERNAME_START' })
    Promise.resolve(context.fixUsername(username))
      .then((username: string) => dispatch({ type: 'FIX_USERNAME_SUCCESS', username }))
      .catch((error: Error) => dispatch({ type: 'FIX_USERNAME_ERROR', error }))
  }

  return { ...state, fixUsername }
}
