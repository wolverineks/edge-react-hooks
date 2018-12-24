// @flow

import { type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useReducer } from 'react'

type SaveReceiveAddressStart = {| type: 'SAVE_RECEIVE_ADDRESS_START' |}
type SaveReceiveAddressSuccess = {| type: 'SAVE_RECEIVE_ADDRESS_SUCCESS' |}
type SaveReceiveAddressError = {| error: Error, type: 'SAVE_RECEIVE_ADDRESS_ERROR' |}
type Action = SaveReceiveAddressStart | SaveReceiveAddressSuccess | SaveReceiveAddressError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SAVE_RECEIVE_ADDRESS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'SAVE_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'SAVE_RECEIVE_ADDRESS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSaveReceiveAddress = (
  wallet: EdgeCurrencyWallet | null | void,
  receiveAddress: EdgeReceiveAddress | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const saveReceiveAddress = () => {
    if (!wallet || !receiveAddress) return // mount with null
    dispatch({ type: 'SAVE_RECEIVE_ADDRESS_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .saveReceiveAddress(receiveAddress)
      .then(() => dispatch({ type: 'SAVE_RECEIVE_ADDRESS_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'SAVE_RECEIVE_ADDRESS_ERROR', error }))
  }

  return { ...state, saveReceiveAddress }
}
