// @flow

import { type EdgeCurrencyWallet, type EdgeMetadata } from 'edge-core-js'
import { useReducer } from 'react'

type SaveTransactionMetadataStart = {| type: 'SAVE_TRANSACTION_METADATA_START' |}
type SaveTransactionMetadataSuccess = {| type: 'SAVE_TRANSACTION_METADATA_SUCCESS' |}
type SaveTransactionMetadataError = {| error: Error, type: 'SAVE_TRANSACTION_METADATA_ERROR' |}
type Action = SaveTransactionMetadataStart | SaveTransactionMetadataSuccess | SaveTransactionMetadataError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SAVE_TRANSACTION_METADATA_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SAVE_TRANSACTION_METADATA_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SAVE_TRANSACTION_METADATA_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSaveTransactionMetadata = (
  wallet: ?EdgeCurrencyWallet,
  txid: ?string,
  currencyCode: ?string,
  metadata: ?EdgeMetadata
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const saveTransactionMetadata = () => {
    if (!wallet || !txid || !currencyCode || !metadata) return
    dispatch({ type: 'SAVE_TRANSACTION_METADATA_START' })
    wallet
      .saveTxMetadata(txid, currencyCode, metadata)
      .then(() => dispatch({ type: 'SAVE_TRANSACTION_METADATA_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SAVE_TRANSACTION_METADATA_ERROR', error }))
  }

  return { ...state, saveTransactionMetadata }
}
