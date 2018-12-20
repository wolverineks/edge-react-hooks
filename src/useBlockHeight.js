// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type READ_BLOCK_HEIGHT_SUCCESS = {| blockHeight: number | null, type: 'READ_BLOCK_HEIGHT_SUCCESS' |}
type Action = READ_BLOCK_HEIGHT_SUCCESS

type State = {
  blockHeight: number | null
}

const initialState: State = {
  blockHeight: null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_BLOCK_HEIGHT_SUCCESS': {
      const { blockHeight } = action
      return { ...state, blockHeight }
    }
    default:
      return state
  }
}

export const useBlockHeight = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({ type: 'READ_BLOCK_HEIGHT_SUCCESS', blockHeight: wallet.blockHeight })

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'blockHeight',
      (blockHeight: $PropertyType<EdgeCurrencyWallet, 'blockHeight'>) =>
        dispatch({ type: 'READ_BLOCK_HEIGHT_SUCCESS', blockHeight })
    )

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return state.blockHeight
}
