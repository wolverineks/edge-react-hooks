// @flow

import { type EdgeCurrencyWallet, type EdgeEncodeUri } from 'edge-core-js'
import { useReducer } from 'react'

type EncodeUriStart = {| type: 'ENCODE_URI_START' |}
type EncodeUriSuccess = {| type: 'ENCODE_URI_SUCCESS', uri: string |}
type EncodeUriError = {| error: Error, type: 'ENCODE_URI_ERROR' |}
type Action = EncodeUriStart | EncodeUriSuccess | EncodeUriError

type State = {| error: Error | null, pending: boolean, uri: string | null |}

const initialState: State = { pending: false, error: null, uri: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ENCODE_URI_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ENCODE_URI_SUCCESS': {
      return { ...state, pending: false, uri: action.uri }
    }
    case 'ENCODE_URI_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useEncodeUri = (wallet: ?EdgeCurrencyWallet, uri: ?EdgeEncodeUri) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const encodeUri = () => {
    if (!wallet || !uri) return // mount with null
    dispatch({ type: 'ENCODE_URI_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .encodeUri(uri)
      .then((uri: string) => dispatch({ type: 'ENCODE_URI_SUCCESS', uri }))
      .catch((error: Error) => dispatch({ type: 'ENCODE_URI_ERROR', error }))
  }

  return { ...state, encodeUri }
}
