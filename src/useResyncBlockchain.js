// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type ResyncStart = {| type: 'RESYNC_START' |}
type ResyncSuccess = {| type: 'RESYNC_SUCCESS' |}
type ResyncError = {| error: Error, type: 'RESYNC_ERROR' |}
type Action = ResyncStart | ResyncSuccess | ResyncError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'RESYNC_START': {
      return { ...state, pending: true, error: null }
    }
    case 'RESYNC_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'RESYNC_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useResyncBlockchain = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const resyncBlockchain = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'RESYNC_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .resyncBlockchain()
      .then(() => dispatch({ type: 'RESYNC_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'RESYNC_ERROR', error }))
  }

  return { ...state, resyncBlockchain }
}
