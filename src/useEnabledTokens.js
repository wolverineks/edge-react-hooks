// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type ReadEnabledTokensStart = {| type: 'READ_ENABLED_TOKENS_START' |}
type ReadEnabledTokensSuccess = {| enabledTokens: Array<string>, type: 'READ_ENABLED_TOKENS_SUCCESS' |}
type ReadEnabledTokensError = {| error: Error, type: 'READ_ENABLED_TOKENS_ERROR' |}

type Action = ReadEnabledTokensStart | ReadEnabledTokensSuccess | ReadEnabledTokensError

type State = {| enabledTokens: Array<string> | null, error: Error | null, pending: boolean |}

const initialState: State = { enabledTokens: null, error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_ENABLED_TOKENS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_ENABLED_TOKENS_SUCCESS': {
      return { ...state, pending: false, enabledTokens: action.enabledTokens }
    }
    case 'READ_ENABLED_TOKENS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useEnabledTokens = (wallet: ?EdgeCurrencyWallet) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_ENABLED_TOKENS_START' })
    wallet
      .getEnabledTokens()
      .then((enabledTokens: Array<string>) => dispatch({ type: 'READ_ENABLED_TOKENS_SUCCESS', enabledTokens }))
      .catch((error: Error) => dispatch({ type: 'READ_ENABLED_TOKENS_ERROR', error }))
  }

  useEffect(effect, [wallet])

  return state
}
