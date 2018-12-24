// @flow

import { type EdgeContext, type EdgeEdgeLoginOptions, type EdgePendingEdgeLogin } from 'edge-core-js'
import { useReducer } from 'react'

type RequestEdgeLoginStart = {| type: 'REQUEST_EDGE_LOGIN_START' |}
type RequestEdgeLoginSuccess = {| pendingLogin: EdgePendingEdgeLogin, type: 'REQUEST_EDGE_LOGIN_SUCCESS' |}
type RequestEdgeLoginError = {| error: Error, type: 'REQUEST_EDGE_LOGIN_ERROR' |}

type Action = RequestEdgeLoginStart | RequestEdgeLoginSuccess | RequestEdgeLoginError

type State = {| error: Error | null, pending: boolean, pendingLogin: EdgePendingEdgeLogin | null |}

const initialState: State = { pending: false, error: null, pendingLogin: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'REQUEST_EDGE_LOGIN_START': {
      return { ...state, pending: true, error: null, pendingLogin: null }
    }
    case 'REQUEST_EDGE_LOGIN_SUCCESS': {
      return { ...state, pending: false, pendingLogin: action.pendingLogin }
    }
    case 'REQUEST_EDGE_LOGIN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useRequestEdgeLogin = (
  context: EdgeContext | null | void,
  options: EdgeEdgeLoginOptions | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const requestEdgeLogin = () => {
    if (!context || !options) return
    dispatch({ type: 'REQUEST_EDGE_LOGIN_START' })
    context
      .requestEdgeLogin(options)
      .then((pendingLogin: EdgePendingEdgeLogin) => dispatch({ type: 'REQUEST_EDGE_LOGIN_SUCCESS', pendingLogin }))
      .catch((error: Error) => dispatch({ type: 'REQUEST_EDGE_LOGIN_ERROR', error }))
  }

  return { ...state, requestEdgeLogin }
}
