// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useReducer } from 'react'

type ExportStart = {| type: 'EXPORT_START' |}
type ExportSuccess = {| csv: string, type: 'EXPORT_SUCCESS' |}
type ExportError = {| error: Error, type: 'EXPORT_ERROR' |}
type Action = ExportStart | ExportSuccess | ExportError

type State = {| csv: string | null, error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null, csv: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'EXPORT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'EXPORT_SUCCESS': {
      return { ...state, pending: false, csv: action.csv }
    }
    case 'EXPORT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useExportToCsv = (
  wallet: EdgeCurrencyWallet | null | void,
  options: EdgeGetTransactionsOptions | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const exportToCsv = () => {
    if (!wallet || !options) return // mount with null
    dispatch({ type: 'EXPORT_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .exportTransactionsToCSV(options)
      .then((csv: string) => dispatch({ type: 'EXPORT_SUCCESS', csv }))
      .catch((error: Error) => dispatch({ type: 'EXPORT_ERROR', error }))
  }

  return { ...state, exportToCsv }
}
