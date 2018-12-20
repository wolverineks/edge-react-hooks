// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type READ_SYNC_RATIO_SUCCESS = {| syncRatio: number | null, type: 'READ_SYNC_RATIO_SUCCESS' |}
type Action = READ_SYNC_RATIO_SUCCESS

type State = {
  syncRatio: number | null
}

const initialState: State = {
  syncRatio: null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_SYNC_RATIO_SUCCESS': {
      const { syncRatio } = action
      return { ...state, syncRatio }
    }
    default:
      return state
  }
}

export const useSyncRatio = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({ type: 'READ_SYNC_RATIO_SUCCESS', syncRatio: wallet.syncRatio })

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'syncRatio',
      (syncRatio: $PropertyType<EdgeCurrencyWallet, 'syncRatio'>) =>
        dispatch({ type: 'READ_SYNC_RATIO_SUCCESS', syncRatio })
    )

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return state.syncRatio
}
