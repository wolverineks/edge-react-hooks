// @flow

import { type EdgeContext, type EdgeUserInfo } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type READ_LOCAL_USERS_SUCCESS = { localUsers: Array<EdgeUserInfo>, type: 'READ_LOCAL_USERS_SUCCESS' }
type DELETE_LOCAL_USER_START = { type: 'DELETE_LOCAL_USER_START' }
type DELETE_LOCAL_USER_SUCCESS = { type: 'DELETE_LOCAL_USER_SUCCESS' }
type DELETE_LOCAL_USER_ERROR = { error: Error, type: 'DELETE_LOCAL_USER_ERROR' }

type Action = READ_LOCAL_USERS_SUCCESS | DELETE_LOCAL_USER_START | DELETE_LOCAL_USER_SUCCESS | DELETE_LOCAL_USER_ERROR

type State = { deletePending: boolean, localUsers: Array<EdgeUserInfo> | null }

const initialState = { deletePending: false, localUsers: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_LOCAL_USERS_SUCCESS': {
      return { ...state, localUsers: action.localUsers }
    }

    case 'DELETE_LOCAL_USER_START': {
      return { ...state, deletePending: true, error: null }
    }

    case 'DELETE_LOCAL_USER_SUCCESS': {
      return { ...state, deletePending: false }
    }

    case 'DELETE_LOCAL_USER_ERROR': {
      return { ...state, deletePending: false, error: action.error }
    }

    default:
      return state
  }
}

export const useLocalUsers = (context: EdgeContext | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const deleteLocalUser = (username: string) => {
    if (!context) return
    dispatch({ type: 'DELETE_LOCAL_USER_START' })
    context
      .deleteLocalAccount(username)
      .then(() => dispatch({ type: 'DELETE_LOCAL_USER_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DELETE_LOCAL_USER_ERROR', error }))
  }

  const effect = () => {
    if (!context) return // mount with null
    dispatch({ type: 'READ_LOCAL_USERS_SUCCESS', localUsers: context.localUsers })
    const unsubscribe = context.watch('localUsers', (localUsers: Array<EdgeUserInfo>) =>
      dispatch({ type: 'READ_LOCAL_USERS_SUCCESS', localUsers })
    ) // mount with context / null -> context / contextA -> contextB (2)
    return unsubscribe // unmount with context / contextA -> contextB (1) / context -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [context]) // onUpdate

  return { ...state, deleteLocalUser }
}
