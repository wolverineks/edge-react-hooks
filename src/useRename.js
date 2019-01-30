// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type RenameStart = {| type: 'RENAME_START' |}
type RenameSuccess = {| type: 'RENAME_SUCCESS' |}
type RenameError = {| error: Error, type: 'RENAME_ERROR' |}
type Action = RenameStart | RenameSuccess | RenameError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'RENAME_START': {
      return { ...state, pending: true, error: null }
    }
    case 'RENAME_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'RENAME_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useRename = (wallet: ?EdgeCurrencyWallet, name: ?string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const rename = () => {
    if (!wallet || !name) return
    dispatch({ type: 'RENAME_START' })
    wallet
      .renameWallet(name)
      .then(() => dispatch({ type: 'RENAME_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'RENAME_ERROR', error }))
  }

  return { ...state, rename }
}
