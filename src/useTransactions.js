// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions, type EdgeTransaction } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type Transactions = Array<EdgeTransaction>

type READ_TRANSACTIONS_START = { type: 'READ_TRANSACTIONS_START' }
type READ_TRANSACTIONS_SUCCESS = { transactions: Transactions, type: 'READ_TRANSACTIONS_SUCCESS' }
type READ_TRANSACTIONS_ERROR = { error: Error, type: 'READ_TRANSACTIONS_ERROR' }
type Action = READ_TRANSACTIONS_START | READ_TRANSACTIONS_SUCCESS | READ_TRANSACTIONS_ERROR

type State = { error: Error | null, pending: boolean, transactions: Transactions | null }

const initialState = { pending: false, error: null, transactions: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_TRANSACTIONS_START': {
      return { ...state, pending: true, error: null }
    }

    case 'READ_TRANSACTIONS_SUCCESS': {
      return { ...state, started: true, pending: false, transactions: action.transactions }
    }

    case 'READ_TRANSACTIONS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
}

export const useTransactions = (
  wallet: EdgeCurrencyWallet | null | void,
  options: EdgeGetTransactionsOptions | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_TRANSACTIONS_START' })
    wallet
      .getTransactions(options || undefined)
      .then((transactions: Transactions) => dispatch({ type: 'READ_TRANSACTIONS_SUCCESS', transactions }))
      .catch((error: Error) => dispatch({ type: 'READ_TRANSACTIONS_ERROR', error }))

    const unsubscribe = wallet.on('newTransactions', () => {
      if (!wallet) return
      dispatch({ type: 'READ_TRANSACTIONS_START' })
      wallet
        .getTransactions(options || undefined)
        .then((transactions: Transactions) => dispatch({ type: 'READ_TRANSACTIONS_SUCCESS', transactions }))
        .catch((error: Error) => dispatch({ type: 'READ_TRANSACTIONS_ERROR', error }))
    }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state }
}
