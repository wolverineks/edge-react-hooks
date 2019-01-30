// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type EnableTokensStart = {| type: 'ENABLE_TOKENS_START' |}
type EnableTokensSuccess = {| type: 'ENABLE_TOKENS_SUCCESS' |}
type EnableTokensError = {| error: Error, type: 'ENABLE_TOKENS_ERROR' |}

type Action = EnableTokensStart | EnableTokensSuccess | EnableTokensError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ENABLE_TOKENS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENABLE_TOKENS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ENABLE_TOKENS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useEnableTokens = (wallet: ?EdgeCurrencyWallet, tokens: ?Array<string>) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enableTokens = () => {
    if (!wallet || !tokens) return
    dispatch({ type: 'ENABLE_TOKENS_START' })
    wallet
      .enableTokens(tokens)
      .then(() => dispatch({ type: 'ENABLE_TOKENS_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ENABLE_TOKENS_ERROR', error }))
  }

  return { ...state, enableTokens }
}
