// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type StopEngineStart = {| type: 'STOP_ENGINE_START' |}
type StopEngineSuccess = {| type: 'STOP_ENGINE_SUCCESS' |}
type StopEngineError = {| error: Error, type: 'STOP_ENGINE_ERROR' |}
type Action = StopEngineStart | StopEngineSuccess | StopEngineError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'STOP_ENGINE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'STOP_ENGINE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'STOP_ENGINE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useStopEngine = (wallet: ?EdgeCurrencyWallet) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const stopEngine = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'STOP_ENGINE_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .stopEngine()
      .then(() => dispatch({ type: 'STOP_ENGINE_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'STOP_ENGINE_ERROR', error }))
  }

  return { ...state, stopEngine }
}
