// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type FetchRecovery2QuestionsStart = {| type: 'FETCH_RECOVERY_2_QUESTIONS_START' |}
type FetchRecovery2QuestionsSuccess = {|
  recovery2Questions: Array<string>,
  type: 'FETCH_RECOVERY_2_QUESTIONS_SUCCESS'
|}
type FetchRecovery2QuestionsError = {| error: Error, type: 'FETCH_RECOVERY_2_QUESTIONS_ERROR' |}

type Action = FetchRecovery2QuestionsStart | FetchRecovery2QuestionsSuccess | FetchRecovery2QuestionsError

type State = {| error: Error | null, pending: boolean, recovery2Questions: Array<string> | null |}

const initialState: State = { pending: false, error: null, recovery2Questions: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_RECOVERY_2_QUESTIONS_START': {
      return { ...state, pending: true, error: null, recovery2Questions: null }
    }
    case 'FETCH_RECOVERY_2_QUESTIONS_SUCCESS': {
      return { ...state, pending: false, recovery2Questions: action.recovery2Questions }
    }
    case 'FETCH_RECOVERY_2_QUESTIONS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useFetchRecovery2Questions = (
  context: EdgeContext | null | void,
  recovery2Key: string | null | void,
  username: string | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchRecovery2Questions = () => {
    if (!context || !recovery2Key || !username) return
    dispatch({ type: 'FETCH_RECOVERY_2_QUESTIONS_START' })
    context
      .fetchRecovery2Questions(recovery2Key, username)
      .then(recovery2Questions => dispatch({ type: 'FETCH_RECOVERY_2_QUESTIONS_SUCCESS', recovery2Questions }))
      .catch((error: Error) => dispatch({ type: 'FETCH_RECOVERY_2_QUESTIONS_ERROR', error }))
  }

  return { ...state, fetchRecovery2Questions }
}
