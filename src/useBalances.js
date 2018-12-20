// @flow

import { type EdgeBalances, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type READ_BALANCES_SUCCESS = {| balances: EdgeBalances | null, type: 'READ_BALANCES_SUCCESS' |}
type Action = READ_BALANCES_SUCCESS

type State = {
  balances: EdgeBalances | null
}

const initialState: State = {
  balances: null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_BALANCES_SUCCESS': {
      const { balances } = action
      return { ...state, balances }
    }
    default:
      return state
  }
}

export const useBalances = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({ type: 'READ_BALANCES_SUCCESS', balances: wallet.balances })

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'balances',
      (balances: $PropertyType<EdgeCurrencyWallet, 'balances'>) => dispatch({ type: 'READ_BALANCES_SUCCESS', balances })
    )

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return state.balances
}
