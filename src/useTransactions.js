// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions, type EdgeTransaction } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type Transactions = Array<EdgeTransaction>

type ReadTransactionsStart = {| type: 'READ_TRANSACTIONS_START' |}
type ReadTransactionsSuccess = {| transactions: Transactions, type: 'READ_TRANSACTIONS_SUCCESS' |}
type ReadTransactionsError = {| error: Error, type: 'READ_TRANSACTIONS_ERROR' |}
type Action = ReadTransactionsStart | ReadTransactionsSuccess | ReadTransactionsError

type State = {| error: Error | null, pending: boolean, transactions: Transactions | null |}

const initialState: State = { pending: false, error: null, transactions: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_TRANSACTIONS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_TRANSACTIONS_SUCCESS': {
      return { ...state, pending: false, transactions: action.transactions }
    }
    case 'READ_TRANSACTIONS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useTransactions = (wallet: ?EdgeCurrencyWallet, options: ?EdgeGetTransactionsOptions = {}) => {
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

  useEffect(effect, [wallet])

  return { ...state }
}
