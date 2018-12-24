// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type EnablePinLoginStart = {| type: 'ENABLE_PIN_LOGIN_START' |}
type EnablePinLoginSuccess = {| type: 'ENABLE_PIN_LOGIN_SUCCESS' |}
type EnablePinLoginError = {| error: Error, type: 'ENABLE_PIN_LOGIN_ERROR' |}

type Action = EnablePinLoginStart | EnablePinLoginSuccess | EnablePinLoginError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ENABLE_PIN_LOGIN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENABLE_PIN_LOGIN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ENABLE_PIN_LOGIN_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useEnablePinLogin = (account: EdgeAccount | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enablePinLogin = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'ENABLE_PIN_LOGIN_START' })
    account
      .changePin({ enableLogin: true })
      .then(() => dispatch({ type: 'ENABLE_PIN_LOGIN_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ENABLE_PIN_LOGIN_ERROR', error }))
  }

  return { ...state, enablePinLogin }
}
