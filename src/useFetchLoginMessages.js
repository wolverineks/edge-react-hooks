// @flow

import { type EdgeContext, type EdgeLoginMessages } from 'edge-core-js'
import { useReducer } from 'react'

type FetchLoginMessagesStart = {| type: 'FETCH_LOGIN_MESSAGES_START' |}
type FetchLoginMessagesSuccess = {| loginMessages: EdgeLoginMessages, type: 'FETCH_LOGIN_MESSAGES_SUCCESS' |}
type FetchLoginMessagesError = {| error: Error, type: 'FETCH_LOGIN_MESSAGES_ERROR' |}

type Action = FetchLoginMessagesStart | FetchLoginMessagesSuccess | FetchLoginMessagesError

type State = {| error: Error | null, loginMessages: EdgeLoginMessages | null, pending: boolean |}

const initialState: State = { pending: false, error: null, loginMessages: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_LOGIN_MESSAGES_START': {
      return { ...state, pending: true, error: null, loginMessages: null }
    }
    case 'FETCH_LOGIN_MESSAGES_SUCCESS': {
      return { ...state, pending: false, loginMessages: action.loginMessages }
    }
    case 'FETCH_LOGIN_MESSAGES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useFetchLoginMessages = (context: ?EdgeContext) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchLoginMessages = () => {
    if (!context) return
    dispatch({ type: 'FETCH_LOGIN_MESSAGES_START' })
    context
      .fetchLoginMessages()
      .then((loginMessages: EdgeLoginMessages) => dispatch({ type: 'FETCH_LOGIN_MESSAGES_SUCCESS', loginMessages }))
      .catch((error: Error) => dispatch({ type: 'FETCH_LOGIN_MESSAGES_ERROR', error }))
  }

  return { ...state, fetchLoginMessages }
}
