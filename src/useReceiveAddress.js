// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type ReadReceiveAddressStart = {| type: 'READ_RECEIVE_ADDRESS_START' |}
type ReadReceiveAddressSuccess = {| receiveAddress: EdgeReceiveAddress, type: 'READ_RECEIVE_ADDRESS_SUCCESS' |}
type ReadReceiveAddressError = {| error: Error, type: 'READ_RECEIVE_ADDRESS_ERROR' |}

type Action = ReadReceiveAddressStart | ReadReceiveAddressSuccess | ReadReceiveAddressError

type State = {| error: Error | null, pending: boolean, receiveAddress: EdgeReceiveAddress | null |}

const initialState: State = { pending: false, error: null, receiveAddress: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_RECEIVE_ADDRESS_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, pending: false, receiveAddress: action.receiveAddress }
    }
    case 'READ_RECEIVE_ADDRESS_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useReceiveAddress = (wallet: ?EdgeCurrencyWallet, options: ?EdgeCurrencyCodeOptions) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_RECEIVE_ADDRESS_START' })
    wallet
      .getReceiveAddress(options || undefined)
      .then((receiveAddress: EdgeReceiveAddress) => dispatch({ type: 'READ_RECEIVE_ADDRESS_SUCCESS', receiveAddress }))
      .catch((error: Error) => dispatch({ type: 'READ_RECEIVE_ADDRESS_ERROR', error }))

    const unsubscribe = wallet.on('newTransactions', () => {
      if (!wallet) return
      dispatch({ type: 'READ_RECEIVE_ADDRESS_START' })
      wallet
        .getReceiveAddress(options || undefined)
        .then((receiveAddress: EdgeReceiveAddress) =>
          dispatch({ type: 'READ_RECEIVE_ADDRESS_SUCCESS', receiveAddress })
        )
        .catch((error: Error) => dispatch({ type: 'READ_RECEIVE_ADDRESS_ERROR', error }))
    }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, [wallet])

  return state
}
