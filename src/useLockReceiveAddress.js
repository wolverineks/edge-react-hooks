// @flow

import { type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useReducer } from 'react'

type LockReceiveAddressStart = {| type: 'LOCK_RECEIVE_ADDRESS_START' |}
type LockReceiveAddressSuccess = {| type: 'LOCK_RECEIVE_ADDRESS_SUCCESS' |}
type LockReceiveAddressError = {| error: Error, type: 'LOCK_RECEIVE_ADDRESS_ERROR' |}
type Action = LockReceiveAddressStart | LockReceiveAddressSuccess | LockReceiveAddressError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOCK_RECEIVE_ADDRESS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'LOCK_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'LOCK_RECEIVE_ADDRESS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useLockReceiveAddress = (wallet: ?EdgeCurrencyWallet, receiveAddress: ?EdgeReceiveAddress) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const lockReceiveAddress = () => {
    if (!wallet || !receiveAddress) return // mount with null
    dispatch({ type: 'LOCK_RECEIVE_ADDRESS_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .lockReceiveAddress(receiveAddress)
      .then(() => dispatch({ type: 'LOCK_RECEIVE_ADDRESS_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'LOCK_RECEIVE_ADDRESS_ERROR', error }))
  }

  return { ...state, lockReceiveAddress }
}
