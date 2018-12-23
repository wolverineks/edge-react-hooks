// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type ReadTransactionCountStart = {| type: 'READ_TRANSACTION_COUNT_START' |}
type ReadTransactionCountSuccess = {| transactionCount: number, type: 'READ_TRANSACTION_COUNT_SUCCESS' |}
type ReadTransactionCountError = {| error: Error, type: 'READ_TRANSACTION_COUNT_ERROR' |}
type Action = ReadTransactionCountStart | ReadTransactionCountSuccess | ReadTransactionCountError

type State = {| error: Error | null, pending: boolean, transactionCount: number | null |}

const initialState: State = { pending: false, error: null, transactionCount: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_TRANSACTION_COUNT_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_TRANSACTION_COUNT_SUCCESS': {
      return { ...state, pending: false, transactionCount: action.transactionCount }
    }
    case 'READ_TRANSACTION_COUNT_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useTransactionCount = (
  wallet: EdgeCurrencyWallet | null | void,
  options: EdgeCurrencyCodeOptions | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_TRANSACTION_COUNT_START' })
    wallet
      .getNumTransactions(options || undefined)
      .then((transactionCount: number) => dispatch({ type: 'READ_TRANSACTION_COUNT_SUCCESS', transactionCount }))
      .catch((error: Error) => dispatch({ type: 'READ_TRANSACTION_COUNT_ERROR', error }))

    const unsubscribe = wallet.on('newTransactions', () => {
      if (!wallet) return
      dispatch({ type: 'READ_TRANSACTION_COUNT_START' })
      wallet
        .getNumTransactions(options || undefined)
        .then((transactionCount: number) => dispatch({ type: 'READ_TRANSACTION_COUNT_SUCCESS', transactionCount }))
        .catch((error: Error) => dispatch({ type: 'READ_TRANSACTION_COUNT_ERROR', error }))
    }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state }
}
