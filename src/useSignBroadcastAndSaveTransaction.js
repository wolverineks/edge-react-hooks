// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useReducer } from 'react'

type SBSTransactionStart = {| type: 'SBS_TRANSACTION_START' |}
type SBSTransactionSuccess = {| type: 'SBS_TRANSACTION_SUCCESS' |}
type SBSTransactionError = {| error: Error, type: 'SBS_TRANSACTION_ERROR' |}
type Action = SBSTransactionStart | SBSTransactionSuccess | SBSTransactionError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SBS_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SBS_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SBS_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSignBroadcastAndSaveTransaction = (
  wallet: EdgeCurrencyWallet | null | void,
  transaction: EdgeTransaction | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const signBroadcastAndSaveTransaction = () => {
    if (!wallet || !transaction) return
    dispatch({ type: 'SBS_TRANSACTION_START' })
    Promise.resolve(transaction)
      .then(signTx(wallet))
      .then(broadcastTx(wallet))
      .then(saveTx(wallet))
      .then(() => dispatch({ type: 'SBS_TRANSACTION_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SBS_TRANSACTION_ERROR', error }))
  }

  return { ...state, signBroadcastAndSaveTransaction }
}

const signTx = (wallet: EdgeCurrencyWallet) => (transaction: EdgeTransaction) => {
  return wallet.signTx(transaction).then(() => transaction)
}
const broadcastTx = (wallet: EdgeCurrencyWallet) => (transaction: EdgeTransaction) => {
  return wallet.broadcastTx(transaction).then(() => transaction)
}
const saveTx = (wallet: EdgeCurrencyWallet) => (transaction: EdgeTransaction) => {
  return wallet.saveTx(transaction).then(() => transaction)
}
