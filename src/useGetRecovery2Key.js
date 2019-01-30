// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type GetRecovery2KeyStart = {| type: 'GET_RECOVERY_2_KEY_START' |}
type GetRecovery2KeySuccess = {| recovery2Key: string, type: 'GET_RECOVERY_2_KEY_SUCCESS' |}
type GetRecovery2KeyError = {| error: Error, type: 'GET_RECOVERY_2_KEY_ERROR' |}

type Action = GetRecovery2KeyStart | GetRecovery2KeySuccess | GetRecovery2KeyError

type State = {| error: Error | null, pending: boolean, recovery2Key: string | null |}

const initialState: State = { pending: false, error: null, recovery2Key: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_RECOVERY_2_KEY_START': {
      return { ...state, pending: true, error: null, recovery2Key: null }
    }
    case 'GET_RECOVERY_2_KEY_SUCCESS': {
      return { ...state, pending: false, recovery2Key: action.recovery2Key }
    }
    case 'GET_RECOVERY_2_KEY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useGetRecovery2Key = (context: ?EdgeContext, username: ?string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getRecovery2Key = () => {
    if (!context || !username) return
    dispatch({ type: 'GET_RECOVERY_2_KEY_START' })
    context
      .getRecovery2Key(username)
      .then((recovery2Key: string) => dispatch({ type: 'GET_RECOVERY_2_KEY_SUCCESS', recovery2Key }))
      .catch((error: Error) => dispatch({ type: 'GET_RECOVERY_2_KEY_ERROR', error }))
  }

  return { ...state, getRecovery2Key }
}
