// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type READ_RECEIVE_ADDRESS_START = { type: 'READ_RECEIVE_ADDRESS_START' }
type READ_RECEIVE_ADDRESS_SUCCESS = { receiveAddress: EdgeReceiveAddress, type: 'READ_RECEIVE_ADDRESS_SUCCESS' }
type READ_RECEIVE_ADDRESS_ERROR = { error: Error, type: 'READ_RECEIVE_ADDRESS_ERROR' }

type LOCK_RECEIVE_ADDRESS_START = { type: 'LOCK_RECEIVE_ADDRESS_START' }
type LOCK_RECEIVE_ADDRESS_SUCCESS = { type: 'LOCK_RECEIVE_ADDRESS_SUCCESS' }
type LOCK_RECEIVE_ADDRESS_ERROR = { error: Error, type: 'LOCK_RECEIVE_ADDRESS_ERROR' }

type SAVE_RECEIVE_ADDRESS_START = { type: 'SAVE_RECEIVE_ADDRESS_START' }
type SAVE_RECEIVE_ADDRESS_SUCCESS = { type: 'SAVE_RECEIVE_ADDRESS_SUCCESS' }
type SAVE_RECEIVE_ADDRESS_ERROR = { error: Error, type: 'SAVE_RECEIVE_ADDRESS_ERROR' }

type Action =
  | READ_RECEIVE_ADDRESS_START
  | READ_RECEIVE_ADDRESS_SUCCESS
  | READ_RECEIVE_ADDRESS_ERROR
  | LOCK_RECEIVE_ADDRESS_START
  | LOCK_RECEIVE_ADDRESS_SUCCESS
  | LOCK_RECEIVE_ADDRESS_ERROR
  | SAVE_RECEIVE_ADDRESS_START
  | SAVE_RECEIVE_ADDRESS_SUCCESS
  | SAVE_RECEIVE_ADDRESS_ERROR

type State = {
  lockReceiveAddressError: Error | null,
  lockReceiveAddressPending: boolean,
  readReceiveAddressError: Error | null,
  readReceiveAddressPending: boolean,
  receiveAddress: EdgeReceiveAddress | null,
  saveReceiveAddressError: Error | null,
  saveReceiveAddressPending: boolean
}

const initialState = {
  lockReceiveAddressPending: false,
  readReceiveAddressPending: false,
  lockReceiveAddressError: null,
  readReceiveAddressError: null,
  receiveAddress: null,
  saveReceiveAddressPending: false,
  saveReceiveAddressError: null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_RECEIVE_ADDRESS_START': {
      return { ...state, readReceiveAddressPending: true, readReceiveAddressError: null }
    }
    case 'SAVE_RECEIVE_ADDRESS_START': {
      return { ...state, saveReceiveAddressPending: true, saveReceiveAddressError: null }
    }
    case 'LOCK_RECEIVE_ADDRESS_START': {
      return { ...state, lockReceiveAddressPending: true, lockReceiveAddressError: null }
    }

    case 'READ_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, started: true, readReceiveAddressPending: false, receiveAddress: action.receiveAddress }
    }
    case 'SAVE_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, started: true, saveReceiveAddressPending: false }
    }
    case 'LOCK_RECEIVE_ADDRESS_SUCCESS': {
      return { ...state, started: true, lockReceiveAddressPending: false }
    }

    case 'READ_RECEIVE_ADDRESS_ERROR': {
      return { ...state, readReceiveAddressPending: false, readReceiveAddressError: action.error }
    }
    case 'SAVE_RECEIVE_ADDRESS_ERROR': {
      return { ...state, saveReceiveAddressPending: false, saveReceiveAddressError: action.error }
    }
    case 'LOCK_RECEIVE_ADDRESS_ERROR': {
      return { ...state, lockReceiveAddressPending: false, lockReceiveAddressError: action.error }
    }

    default:
      return state
  }
}

export const useReceiveAddress = (
  wallet: EdgeCurrencyWallet | null | void,
  options: EdgeCurrencyCodeOptions | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const lockReceiveAddress = () => {}
  const saveReceiveAddress = () => {}

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

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state, saveReceiveAddress, lockReceiveAddress }
}
