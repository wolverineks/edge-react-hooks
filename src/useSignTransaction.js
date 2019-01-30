// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useReducer } from 'react'

type SignTransactionStart = {| type: 'SIGN_TRANSACTION_START' |}
type SignTransactionSuccess = {| type: 'SIGN_TRANSACTION_SUCCESS' |}
type SignTransactionError = {| error: Error, type: 'SIGN_TRANSACTION_ERROR' |}
type Action = SignTransactionStart | SignTransactionSuccess | SignTransactionError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SIGN_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SIGN_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SIGN_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSignTransaction = (wallet: ?EdgeCurrencyWallet, transaction: ?EdgeTransaction) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const signTransaction = () => {
    if (!wallet || !transaction) return // mount with null
    dispatch({ type: 'SIGN_TRANSACTION_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .signTx(transaction)
      .then(() => dispatch({ type: 'SIGN_TRANSACTION_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SIGN_TRANSACTION_ERROR', error }))
  }

  return { ...state, signTransaction }
}
