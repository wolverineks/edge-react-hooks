// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useReducer } from 'react'

type ExportStart = {| type: 'EXPORT_START' |}
type ExportSuccess = {| qbo: string, type: 'EXPORT_SUCCESS' |}
type ExportError = {| error: Error, type: 'EXPORT_ERROR' |}
type Action = ExportStart | ExportSuccess | ExportError

type State = {| error: Error | null, pending: boolean, qbo: string | null |}

const initialState: State = { pending: false, error: null, qbo: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'EXPORT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'EXPORT_SUCCESS': {
      return { ...state, pending: false, qbo: action.qbo }
    }
    case 'EXPORT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useExportToQbo = (wallet: ?EdgeCurrencyWallet, options: ?EdgeGetTransactionsOptions) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const exportToQbo = () => {
    if (!wallet || !options) return // mount with null
    dispatch({ type: 'EXPORT_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .exportTransactionsToQBO(options)
      .then((qbo: string) => dispatch({ type: 'EXPORT_SUCCESS', qbo }))
      .catch((error: Error) => dispatch({ type: 'EXPORT_ERROR', error }))
  }

  return { ...state, exportToQbo }
}
