// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

export type Stringifyable = string | number | { [string]: Stringifyable } | Array<Stringifyable>

type WriteStart = {| type: 'WRITE_START' |}
type WriteSuccess = {| type: 'WRITE_SUCCESS' |}
type WriteError = {| error: Error, type: 'WRITE_ERROR' |}
type Action = WriteStart | WriteSuccess | WriteError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'WRITE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'WRITE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'WRITE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

type StorageContext = EdgeAccount | EdgeCurrencyWallet
export const useSyncedStorageWrite = (storageContext: ?StorageContext, path: ?string, data: Stringifyable) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setData = () => {
    if (!storageContext || !path || !data) return
    dispatch({ type: 'WRITE_START' })
    storageContext.disklet
      .setText(path, JSON.stringify(data))
      .then(() => dispatch({ type: 'WRITE_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'WRITE_ERROR', error }))
  }

  return { ...state, setData }
}
