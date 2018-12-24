// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type ChangeRecoveryStart = {| type: 'CHANGE_RECOVERY_START' |}
type ChangeRecoverySuccess = {| type: 'CHANGE_RECOVERY_SUCCESS' |}
type ChangeRecoveryError = {| error: Error, type: 'CHANGE_RECOVERY_ERROR' |}

type Action = ChangeRecoveryStart | ChangeRecoverySuccess | ChangeRecoveryError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_RECOVERY_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_RECOVERY_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_RECOVERY_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useChangeRecovery = (
  account: EdgeAccount | null | void,
  questions: Array<string>,
  answers: Array<string>
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeRecovery = () => {
    if (!account || !questions || !answers) return
    dispatch({ type: 'CHANGE_RECOVERY_START' })
    account
      .changeRecovery(questions, answers)
      .then(() => dispatch({ type: 'CHANGE_RECOVERY_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CHANGE_RECOVERY_ERROR', error }))
  }

  return { ...state, changeRecovery }
}
