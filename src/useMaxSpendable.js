// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo } from 'edge-core-js'
import { useReducer } from 'react'

type GetMaxSpendableStart = {| type: 'GET_MAX_SPENDABLE_START' |}
type GetMaxSpendableSuccess = {| maxSpendable: string, type: 'GET_MAX_SPENDABLE_SUCCESS' |}
type GetMaxSpendableError = {| error: Error, type: 'GET_MAX_SPENDABLE_ERROR' |}

type Action = GetMaxSpendableStart | GetMaxSpendableSuccess | GetMaxSpendableError

type State = {| error: Error | null, maxSpendable: string | null, pending: boolean |}

const initialState: State = { pending: false, error: null, maxSpendable: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_MAX_SPENDABLE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'GET_MAX_SPENDABLE_SUCCESS': {
      return { ...state, pending: false, maxSpendable: action.maxSpendable }
    }
    case 'GET_MAX_SPENDABLE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useMaxSpendable = (wallet: ?EdgeCurrencyWallet, spendInfo: ?EdgeSpendInfo) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getMaxSpendable = () => {
    if (!wallet || !spendInfo) return // mount with null
    dispatch({ type: 'GET_MAX_SPENDABLE_START' })
    wallet
      .getMaxSpendable(spendInfo)
      .then((maxSpendable: string) => dispatch({ type: 'GET_MAX_SPENDABLE_SUCCESS', maxSpendable }))
      .catch((error: Error) => dispatch({ type: 'GET_MAX_SPENDABLE_ERROR', error }))
  }

  return { ...state, getMaxSpendable }
}
