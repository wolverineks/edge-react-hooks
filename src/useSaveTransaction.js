// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useReducer } from 'react'

type SaveTransactionStart = {| type: 'SAVE_TRANSACTION_START' |}
type SaveTransactionSuccess = {| type: 'SAVE_TRANSACTION_SUCCESS' |}
type SaveTransactionError = {| error: Error, type: 'SAVE_TRANSACTION_ERROR' |}
type Action = SaveTransactionStart | SaveTransactionSuccess | SaveTransactionError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SAVE_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SAVE_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SAVE_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSaveTransaction = (wallet: ?EdgeCurrencyWallet, transaction: ?EdgeTransaction) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const saveTransaction = () => {
    if (!wallet || !transaction) return // mount with null
    dispatch({ type: 'SAVE_TRANSACTION_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .saveTx(transaction)
      .then(() => dispatch({ type: 'SAVE_TRANSACTION_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SAVE_TRANSACTION_ERROR', error }))
  }

  return { ...state, saveTransaction }
}
