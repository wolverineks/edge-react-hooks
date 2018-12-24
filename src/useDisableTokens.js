// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type DisableTokensStart = {| type: 'DISABLE_TOKENS_START' |}
type DisableTokensSuccess = {| type: 'DISABLE_TOKENS_SUCCESS' |}
type DisableTokensError = {| error: Error, type: 'DISABLE_TOKENS_ERROR' |}

type Action = DisableTokensStart | DisableTokensSuccess | DisableTokensError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DISABLE_TOKENS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DISABLE_TOKENS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DISABLE_TOKENS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useDisableTokens = (wallet: EdgeCurrencyWallet | null | void, tokens: Array<string> | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const disableTokens = () => {
    if (!wallet || !tokens) return
    dispatch({ type: 'DISABLE_TOKENS_START' })
    wallet
      .disableTokens(tokens)
      .then(() => dispatch({ type: 'DISABLE_TOKENS_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DISABLE_TOKENS_ERROR', error }))
  }

  return { ...state, disableTokens }
}
