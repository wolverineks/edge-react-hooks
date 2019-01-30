// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type ListRecoveryQuestionChoicesStart = {| type: 'GET_RECOVERY_QUESTIONS_CHOICES_START' |}
type ListRecoveryQuestionChoicesSuccess = {|
  recoveryQuestionChoices: Array<string>,
  type: 'GET_RECOVERY_QUESTIONS_CHOICES_SUCCESS'
|}
type ListRecoveryQuestionChoicesError = {| error: Error, type: 'GET_RECOVERY_QUESTIONS_CHOICES_ERROR' |}

type Action = ListRecoveryQuestionChoicesStart | ListRecoveryQuestionChoicesSuccess | ListRecoveryQuestionChoicesError

type State = {| error: Error | null, pending: boolean, recoveryQuestionChoices: Array<string> | null |}

const initialState: State = { pending: false, error: null, recoveryQuestionChoices: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_RECOVERY_QUESTIONS_CHOICES_START': {
      return { ...state, pending: true, error: null, recoveryQuestionChoices: null }
    }
    case 'GET_RECOVERY_QUESTIONS_CHOICES_SUCCESS': {
      return { ...state, pending: false, recoveryQuestionChoices: action.recoveryQuestionChoices }
    }
    case 'GET_RECOVERY_QUESTIONS_CHOICES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useListRecoveryQuestionChoices = (context: ?EdgeContext, username: ?string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const listRecoveryQuestionChoices = () => {
    if (!context || !username) return
    dispatch({ type: 'GET_RECOVERY_QUESTIONS_CHOICES_START' })
    context
      .listRecoveryQuestionChoices()
      .then((recoveryQuestionChoices: Array<string>) =>
        dispatch({ type: 'GET_RECOVERY_QUESTIONS_CHOICES_SUCCESS', recoveryQuestionChoices })
      )
      .catch((error: Error) => dispatch({ type: 'GET_RECOVERY_QUESTIONS_CHOICES_ERROR', error }))
  }

  return { ...state, listRecoveryQuestionChoices }
}
