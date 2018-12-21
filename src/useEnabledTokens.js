// @flow

import { type EdgeCurrencyWallet, type EdgeTokenInfo } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type READ_ENABLED_TOKENS_START = {| type: 'READ_ENABLED_TOKENS_START' |}
type READ_ENABLED_TOKENS_SUCCESS = {| enabledTokens: Array<string>, type: 'READ_ENABLED_TOKENS_SUCCESS' |}
type READ_ENABLED_TOKENS_ERROR = {| error: Error, type: 'READ_ENABLED_TOKENS_ERROR' |}

type ENABLE_TOKENS_START = {| type: 'ENABLE_TOKENS_START' |}
type ENABLE_TOKENS_SUCCESS = {| type: 'ENABLE_TOKENS_SUCCESS' |}
type ENABLE_TOKENS_ERROR = {| error: Error, type: 'ENABLE_TOKENS_ERROR' |}

type DISABLE_TOKENS_START = {| type: 'DISABLE_TOKENS_START' |}
type DISABLE_TOKENS_SUCCESS = {| type: 'DISABLE_TOKENS_SUCCESS' |}
type DISABLE_TOKENS_ERROR = {| error: Error, type: 'DISABLE_TOKENS_ERROR' |}

type ADD_CUSTOM_TOKEN_START = {| type: 'ADD_CUSTOM_TOKEN_START' |}
type ADD_CUSTOM_TOKEN_SUCCESS = {| type: 'ADD_CUSTOM_TOKEN_SUCCESS' |}
type ADD_CUSTOM_TOKEN_ERROR = {| error: Error, type: 'ADD_CUSTOM_TOKEN_ERROR' |}

type Action =
  | READ_ENABLED_TOKENS_START
  | READ_ENABLED_TOKENS_SUCCESS
  | READ_ENABLED_TOKENS_ERROR
  | DISABLE_TOKENS_START
  | ENABLE_TOKENS_START
  | ENABLE_TOKENS_SUCCESS
  | ENABLE_TOKENS_ERROR
  | DISABLE_TOKENS_START
  | DISABLE_TOKENS_SUCCESS
  | DISABLE_TOKENS_ERROR
  | ADD_CUSTOM_TOKEN_START
  | ADD_CUSTOM_TOKEN_SUCCESS
  | ADD_CUSTOM_TOKEN_ERROR

type State = {
  addCustomTokenError: Error | null,
  addCustomTokenPending: boolean,

  disableTokensError: Error | null,
  disableTokensPending: boolean,

  enableTokensError: Error | null,
  enableTokensPending: boolean,

  enabledTokens: Array<string> | null,

  readEnabledTokensError: Error | null,
  readEnabledTokensPending: boolean
}

const initialState: State = {
  addCustomTokenError: null,
  addCustomTokenPending: false,

  disableTokensError: null,
  disableTokensPending: false,

  enableTokensError: null,
  enableTokensPending: false,

  enabledTokens: null,

  readEnabledTokensError: null,
  readEnabledTokensPending: false
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_ENABLED_TOKENS_START': {
      return { ...state, readEnabledTokensPending: true, readEnabledTokensError: null }
    }
    case 'ENABLE_TOKENS_START': {
      return { ...state, enableTokensPending: true, enableTokensError: null }
    }
    case 'DISABLE_TOKENS_START': {
      return { ...state, disableTokensPending: true, disableTokensError: null }
    }
    case 'ADD_CUSTOM_TOKEN_START': {
      return { ...state, addCustomTokenPending: true, addCustomTokenError: null }
    }

    case 'READ_ENABLED_TOKENS_SUCCESS': {
      return { ...state, readEnabledTokensPending: false, enabledTokens: action.enabledTokens }
    }
    case 'ENABLE_TOKENS_SUCCESS': {
      return { ...state, enableTokensPending: false }
    }
    case 'DISABLE_TOKENS_SUCCESS': {
      return { ...state, disableTokensPending: false }
    }
    case 'ADD_CUSTOM_TOKEN_SUCCESS': {
      return { ...state, addCustomTokenPending: false }
    }

    case 'READ_ENABLED_TOKENS_ERROR': {
      return { ...state, readEnabledTokensPending: false, readEnabledtokensError: action.error }
    }
    case 'ENABLE_TOKENS_ERROR': {
      return { ...state, enableTokensPending: false, enableTokenError: action.error }
    }
    case 'DISABLE_TOKENS_ERROR': {
      return { ...state, disableTokensPending: false, disableTokenError: action.error }
    }
    case 'ADD_CUSTOM_TOKEN_ERROR': {
      return { ...state, addCustomTokenPending: false, addCustomTokenError: action.error }
    }

    default:
      return state
  }
}

export const useEnabledTokens = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enableTokens = (tokens: Array<string>) => {
    if (!wallet) return
    dispatch({ type: 'ENABLE_TOKENS_START' })
    wallet
      .enableTokens(tokens)
      .then(() => dispatch({ type: 'ENABLE_TOKENS_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ENABLE_TOKENS_ERROR', error }))
  }

  const disableTokens = (tokens: Array<string>) => {
    if (!wallet) return
    dispatch({ type: 'DISABLE_TOKENS_START' })
    wallet
      .disableTokens(tokens)
      .then(() => dispatch({ type: 'DISABLE_TOKENS_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DISABLE_TOKENS_ERROR', error }))
  }

  const addCustomToken = (tokenInfo: EdgeTokenInfo) => {
    if (!wallet) return
    dispatch({ type: 'ADD_CUSTOM_TOKEN_START' })
    wallet
      .addCustomToken(tokenInfo)
      .then(() => dispatch({ type: 'ADD_CUSTOM_TOKEN_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ADD_CUSTOM_TOKEN_ERROR', error }))
  }

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_ENABLED_TOKENS_START' })
    wallet
      .getEnabledTokens()
      .then((enabledTokens: Array<string>) => dispatch({ type: 'READ_ENABLED_TOKENS_SUCCESS', enabledTokens }))
      .catch((error: Error) => dispatch({ type: 'READ_ENABLED_TOKENS_ERROR', error }))
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state, enableTokens, disableTokens, addCustomToken }
}
