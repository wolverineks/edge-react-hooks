// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo, type EdgeTransaction } from 'edge-core-js'
import { useReducer } from 'react'

type MakeSpendStart = {| type: 'MAKE_SPEND_START' |}
type MakeSpendSuccess = {| transaction: EdgeTransaction, type: 'MAKE_SPEND_SUCCESS' |}
type MakeSpendError = {| error: Error, type: 'MAKE_SPEND_ERROR' |}
type Action = MakeSpendStart | MakeSpendSuccess | MakeSpendError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'MAKE_SPEND_START': {
      return { ...state, pending: true, error: null }
    }
    case 'MAKE_SPEND_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'MAKE_SPEND_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useMakeSpend = (wallet: EdgeCurrencyWallet | null | void, spendInfo: EdgeSpendInfo | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const makeSpend = () => {
    if (!wallet || !spendInfo) return
    dispatch({ type: 'MAKE_SPEND_START' })
    wallet
      .makeSpend(spendInfo)
      .then((transaction: EdgeTransaction) => dispatch({ type: 'MAKE_SPEND_SUCCESS', transaction }))
      .catch((error: Error) => dispatch({ type: 'MAKE_SPEND_ERROR', error }))
  }

  return { ...state, makeSpend }
}
