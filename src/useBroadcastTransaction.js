// @flow

import { type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useReducer } from 'react'

type BroadcastTransactionStart = {| type: 'BROADCAST_TRANSACTION_START' |}
type BroadcastTransactionSuccess = {| type: 'BROADCAST_TRANSACTION_SUCCESS' |}
type BroadcastTransactionError = {| error: Error, type: 'BROADCAST_TRANSACTION_ERROR' |}

type Action = BroadcastTransactionStart | BroadcastTransactionSuccess | BroadcastTransactionError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'BROADCAST_TRANSACTION_START': {
      return { ...state, pending: true, error: null }
    }
    case 'BROADCAST_TRANSACTION_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'BROADCAST_TRANSACTION_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useBroadcastTransaction = (
  wallet: EdgeCurrencyWallet | null | void,
  transaction: EdgeTransaction | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const broadcastTransaction = () => {
    if (!wallet || !transaction) return
    dispatch({ type: 'BROADCAST_TRANSACTION_START' })
    wallet
      .broadcastTx(transaction)
      .then(() => dispatch({ type: 'BROADCAST_TRANSACTION_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'BROADCAST_TRANSACTION_ERROR', error }))
  }

  return { ...state, broadcastTransaction }
}
