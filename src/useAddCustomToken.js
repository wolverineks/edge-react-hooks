// @flow

import { type EdgeCurrencyWallet, type EdgeTokenInfo } from 'edge-core-js'
import { useReducer } from 'react'

type AddCustomTokenStart = {| type: 'ADD_CUSTOM_TOKEN_START' |}
type AddCustomTokenSuccess = {| type: 'ADD_CUSTOM_TOKEN_SUCCESS' |}
type AddCustomTokenError = {| error: Error, type: 'ADD_CUSTOM_TOKEN_ERROR' |}

type Action = AddCustomTokenStart | AddCustomTokenSuccess | AddCustomTokenError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_CUSTOM_TOKEN_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ADD_CUSTOM_TOKEN_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ADD_CUSTOM_TOKEN_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useAddCustomToken = (wallet: ?EdgeCurrencyWallet, tokenInfo: ?EdgeTokenInfo) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addCustomToken = () => {
    if (!wallet || !tokenInfo) return
    dispatch({ type: 'ADD_CUSTOM_TOKEN_START' })
    wallet
      .addCustomToken(tokenInfo)
      .then(() => dispatch({ type: 'ADD_CUSTOM_TOKEN_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ADD_CUSTOM_TOKEN_ERROR', error }))
  }

  return { ...state, addCustomToken }
}
