// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo } from 'edge-core-js'
import { useReducer } from 'react'

type SweepPrivateKeysStart = {| type: 'SWEEP_PRIVATE_KEYS_START' |}
type SweepPrivateKeysSuccess = {| type: 'SWEEP_PRIVATE_KEYS_SUCCESS' |}
type SweepPrivateKeysError = {| error: Error, type: 'SWEEP_PRIVATE_KEYS_ERROR' |}
type Action = SweepPrivateKeysStart | SweepPrivateKeysSuccess | SweepPrivateKeysError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SWEEP_PRIVATE_KEYS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SWEEP_PRIVATE_KEYS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SWEEP_PRIVATE_KEYS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSweepPrivateKeys = (
  wallet: EdgeCurrencyWallet | null | void,
  spendInfo: EdgeSpendInfo | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sweepPrivateKeys = () => {
    if (!wallet || !spendInfo) return // mount with null
    dispatch({ type: 'SWEEP_PRIVATE_KEYS_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .sweepPrivateKeys(spendInfo)
      .then(() => dispatch({ type: 'SWEEP_PRIVATE_KEYS_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SWEEP_PRIVATE_KEYS_ERROR', error }))
  }

  return { ...state, sweepPrivateKeys }
}
