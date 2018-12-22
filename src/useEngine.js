// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type START_ENGINE_START = { type: 'START_ENGINE_START' }
type START_ENGINE_SUCCESS = { type: 'START_ENGINE_SUCCESS' }
type START_ENGINE_ERROR = { error: Error, type: 'START_ENGINE_ERROR' }
type STOP_ENGINE_START = { type: 'STOP_ENGINE_START' }
type STOP_ENGINE_SUCCESS = { type: 'STOP_ENGINE_SUCCESS' }
type STOP_ENGINE_ERROR = { error: Error, type: 'STOP_ENGINE_ERROR' }
type Action =
  | START_ENGINE_START
  | START_ENGINE_SUCCESS
  | START_ENGINE_ERROR
  | STOP_ENGINE_START
  | STOP_ENGINE_SUCCESS
  | STOP_ENGINE_ERROR

type State = { error: Error | null, pending: boolean }

const initialState = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'START_ENGINE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'STOP_ENGINE_START': {
      return { ...state, pending: true, error: null }
    }

    case 'START_ENGINE_SUCCESS': {
      return { ...state, started: true, pending: false }
    }
    case 'STOP_ENGINE_SUCCESS': {
      return { ...state, started: false, pending: false }
    }

    case 'START_ENGINE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    case 'STOP_ENGINE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
}

export const useEngine = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const startEngine = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'START_ENGINE_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .startEngine()
      .then(() => dispatch({ type: 'START_ENGINE_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'START_ENGINE_ERROR', error }))
  }

  const stopEngine = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'STOP_ENGINE_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .startEngine()
      .then(() => dispatch({ type: 'STOP_ENGINE_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'STOP_ENGINE_ERROR', error }))
  }

  return { ...state, startEngine, stopEngine }
}
