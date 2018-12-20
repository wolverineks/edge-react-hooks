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
      const { name } = action
      return { ...state, pending: false, name }
    }
    case 'WRITE_NAME_ERROR': {
      const { error } = action
      return { ...state, pending: false, error }
    }
    default:
      return state
  }
}

export const useName = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSuccess = (name: string) => () => dispatch({ type: 'WRITE_NAME_SUCCESS', name })
  const onError = (error: Error) => dispatch({ type: 'WRITE_NAME_ERROR', error })

  const setName = (name: string) => {
    if (!wallet) return

    dispatch({ type: 'WRITE_NAME_START' })

    wallet
      .renameWallet(name)
      .then(onSuccess(name))
      .catch(onError)
  }

  const effect = () => {
    if (!wallet) return // mount with null

    dispatch({
      type: 'READ_NAME_SUCCESS',
      name: wallet.name
    })

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'name',
      (name: $PropertyType<EdgeCurrencyWallet, 'name'>) => dispatch({ type: 'WRITE_NAME_SUCCESS', name })
    )

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state, setName }
}
