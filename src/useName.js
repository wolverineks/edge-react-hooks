// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type WRITE_NAME_START = {| type: 'WRITE_NAME_START' |}
type WRITE_NAME_SUCCESS = {| name: string | null, type: 'WRITE_NAME_SUCCESS' |}
type WRITE_NAME_ERROR = {| error: Error, type: 'WRITE_NAME_ERROR' |}
type READ_NAME_SUCCESS = {| name: string | null, type: 'READ_NAME_SUCCESS' |}
type Action = WRITE_NAME_START | WRITE_NAME_SUCCESS | WRITE_NAME_ERROR | READ_NAME_SUCCESS

type State = {
  error: Error | null,
  name: string | null,
  pending: boolean
}

const initialState: State = {
  name: null,
  pending: false,
  error: null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'WRITE_NAME_START': {
      return { ...state, pending: true, error: null }
    }

    case 'READ_NAME_SUCCESS':
    case 'WRITE_NAME_SUCCESS': {
      return { ...state, pending: false, name: action.name }
    }

    case 'WRITE_NAME_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
}

export const useName = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setName = (name: string) => {
    if (!wallet) return
    dispatch({ type: 'WRITE_NAME_START' })
    wallet
      .renameWallet(name)
      .then(() => dispatch({ type: 'WRITE_NAME_SUCCESS', name }))
      .catch((error: Error) => dispatch({ type: 'WRITE_NAME_ERROR', error }))
  }

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_NAME_SUCCESS', name: wallet.name })
    const unsubscribe = wallet.watch('name', (name: $PropertyType<EdgeCurrencyWallet, 'name'>) =>
      dispatch({ type: 'WRITE_NAME_SUCCESS', name })
    ) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state, setName }
}
