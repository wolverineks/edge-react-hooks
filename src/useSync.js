// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type SYNC_START = { type: 'SYNC_START' }
type SYNC_SUCCESS = { type: 'SYNC_SUCCESS' }
type SYNC_ERROR = { error: Error, type: 'SYNC_ERROR' }
type Action = SYNC_START | SYNC_SUCCESS | SYNC_ERROR

type State = { error: Error | null, pending: boolean }

const initialState = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SYNC_START': {
      return { ...state, pending: true, error: null }
    }

    case 'SYNC_SUCCESS': {
      return { ...state, pending: false }
    }

    case 'SYNC_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
}

export const useSync = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sync = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'SYNC_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .sync()
      .then(() => dispatch({ type: 'SYNC_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SYNC_ERROR', error }))
  }

  return { ...state, sync }
}
