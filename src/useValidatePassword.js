// @flow

import { type EdgeContext, type EdgePasswordRules } from 'edge-core-js'
import { useReducer } from 'react'

type ValidatePasswordStart = {| type: 'VALIDATE_PASSWORD_START' |}
type ValidatePasswordSuccess = {| passwordStatus: EdgePasswordRules, type: 'VALIDATE_PASSWORD_SUCCESS' |}
type ValidatePasswordError = {| error: Error, type: 'VALIDATE_PASSWORD_ERROR' |}

type Action = ValidatePasswordStart | ValidatePasswordSuccess | ValidatePasswordError

type State = {| error: Error | null, passwordStatus: EdgePasswordRules | null, pending: boolean |}

const initialState: State = { pending: false, error: null, passwordStatus: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'VALIDATE_PASSWORD_START': {
      return { ...state, pending: true, error: null, passwordStatus: null }
    }
    case 'VALIDATE_PASSWORD_SUCCESS': {
      return { ...state, pending: false, passwordStatus: action.passwordStatus }
    }
    case 'VALIDATE_PASSWORD_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useValidatePassword = (context: EdgeContext | null | void, password: string | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const validatePassword = () => {
    if (!context || !password) return
    dispatch({ type: 'VALIDATE_PASSWORD_START' })
    Promise.resolve(context.checkPasswordRules(password))
      .then((passwordStatus: EdgePasswordRules) => dispatch({ type: 'VALIDATE_PASSWORD_SUCCESS', passwordStatus }))
      .catch((error: Error) => dispatch({ type: 'VALIDATE_PASSWORD_ERROR', error }))
  }

  return { ...state, validatePassword }
}
