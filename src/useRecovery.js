// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type CHANGE_RECOVERY_START = { type: 'CHANGE_RECOVERY_START' }
type DELETE_RECOVERY_START = { type: 'DELETE_RECOVERY_START' }

type CHANGE_RECOVERY_SUCCESS = { type: 'CHANGE_RECOVERY_SUCCESS' }
type DELETE_RECOVERY_SUCCESS = { type: 'DELETE_RECOVERY_SUCCESS' }

type CHANGE_RECOVERY_ERROR = { error: Error, type: 'CHANGE_RECOVERY_ERROR' }
type DELETE_RECOVERY_ERROR = { error: Error, type: 'DELETE_RECOVERY_ERROR' }

type Action =
  | CHANGE_RECOVERY_START
  | CHANGE_RECOVERY_SUCCESS
  | CHANGE_RECOVERY_ERROR
  | DELETE_RECOVERY_START
  | DELETE_RECOVERY_SUCCESS
  | DELETE_RECOVERY_ERROR

type State = {
  changeRecoveryError: Error | null,
  changeRecoveryPending: boolean,
  deleteRecoveryError: Error | null,
  deleteRecoveryPending: boolean
}

const initialState = {
  changeRecoveryError: null,
  changeRecoveryPending: false,
  deleteRecoveryError: null,
  deleteRecoveryPending: false
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_RECOVERY_START': {
      return { ...state, changeRecoveryPending: true, changeRecoveryError: null }
    }
    case 'DELETE_RECOVERY_START': {
      return { ...state, deleteRecoveryPending: true, deleteRecoveryError: null }
    }

    case 'CHANGE_RECOVERY_SUCCESS': {
      return { ...state, changeRecoveryPending: false }
    }
    case 'DELETE_RECOVERY_SUCCESS': {
      return { ...state, deleteRecoveryPending: false }
    }

    case 'CHANGE_RECOVERY_ERROR': {
      return { ...state, changeRecoveryPending: true, changeRecoveryError: action.error }
    }
    case 'DELETE_RECOVERY_ERROR': {
      return { ...state, deleteRecoveryPending: true, deleteRecoveryError: action.error }
    }

    default:
      return state
  }
}

export const useRecovery = (account: EdgeAccount | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeRecovery = (questions: Array<string>, answers: Array<string>) => {
    if (!account || !questions || !answers) return
    dispatch({ type: 'CHANGE_RECOVERY_START' })
    account
      .changeRecovery(questions, answers)
      .then(() => dispatch({ type: 'CHANGE_RECOVERY_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CHANGE_RECOVERY_ERROR', error }))
  }

  const deleteRecovery = () => {
    if (!account) return
    dispatch({ type: 'DELETE_RECOVERY_START' })
    account
      .deleteRecovery()
      .then(() => dispatch({ type: 'DELETE_RECOVERY_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DELETE_RECOVERY_ERROR', error }))
  }

  return { ...state, changeRecovery, deleteRecovery }
}
