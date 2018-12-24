// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type DeleteRecoveryStart = {| type: 'DELETE_RECOVERY_START' |}
type DeleteRecoverySuccess = {| type: 'DELETE_RECOVERY_SUCCESS' |}
type DeleteRecoveryError = {| error: Error, type: 'DELETE_RECOVERY_ERROR' |}

type Action = DeleteRecoveryStart | DeleteRecoverySuccess | DeleteRecoveryError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DELETE_RECOVERY_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_RECOVERY_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_RECOVERY_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useDeleteRecovery = (account: EdgeAccount | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const deleteRecovery = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'DELETE_RECOVERY_START' })
    account
      .deleteRecovery()
      .then(() => dispatch({ type: 'DELETE_RECOVERY_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DELETE_RECOVERY_ERROR', error }))
  }

  return { ...state, deleteRecovery }
}
