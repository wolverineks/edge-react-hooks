// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type SyncStart = {| type: 'SYNC_START' |}
type SyncSuccess = {| type: 'SYNC_SUCCESS' |}
type SyncError = {| error: Error, type: 'SYNC_ERROR' |}
type Action = SyncStart | SyncSuccess | SyncError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

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

export const useSync = (storageContext: EdgeAccount | EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sync = () => {
    if (!storageContext) return // mount with null
    dispatch({ type: 'SYNC_START' }) // mount with storageContext / null -> storageContext / storageContextA -> storageContextB (2)
    storageContext
      .sync()
      .then(() => dispatch({ type: 'SYNC_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SYNC_ERROR', error }))
  }

  return { ...state, sync }
}
