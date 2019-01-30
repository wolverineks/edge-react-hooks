// @flow

import { type EdgeCurrencyWallet, type EdgeParsedUri } from 'edge-core-js'
import { useReducer } from 'react'

type ParseUriStart = {| type: 'PARSE_URI_START' |}
type ParseUriSuccess = {| type: 'PARSE_URI_SUCCESS', uri: EdgeParsedUri |}
type ParseUriError = {| error: Error, type: 'PARSE_URI_ERROR' |}
type Action = ParseUriStart | ParseUriSuccess | ParseUriError

type State = {| error: Error | null, pending: boolean, uri: EdgeParsedUri | null |}

const initialState: State = { pending: false, error: null, uri: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'PARSE_URI_START': {
      return { ...state, pending: true, error: null }
    }
    case 'PARSE_URI_SUCCESS': {
      return { ...state, pending: false, uri: action.uri }
    }
    case 'PARSE_URI_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useParseUri = (wallet: ?EdgeCurrencyWallet, uri: ?string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const parseUri = () => {
    if (!wallet || !uri) return // mount with null
    dispatch({ type: 'PARSE_URI_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .parseUri(uri)
      .then((uri: EdgeParsedUri) => dispatch({ type: 'PARSE_URI_SUCCESS', uri }))
      .catch((error: Error) => dispatch({ type: 'PARSE_URI_ERROR', error }))
  }

  return { ...state, parseUri }
}
