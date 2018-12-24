// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type StartEngineStart = {| type: 'START_ENGINE_START' |}
type StartEngineSuccess = {| type: 'START_ENGINE_SUCCESS' |}
type StartEngineError = {| error: Error, type: 'START_ENGINE_ERROR' |}
type Action = StartEngineStart | StartEngineSuccess | StartEngineError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'START_ENGINE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'START_ENGINE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'START_ENGINE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useStartEngine = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const startEngine = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'START_ENGINE_START' }) // mount with wallet / null -> wallet / walletA -> walletB (2)
    wallet
      .startEngine()
      .then(() => dispatch({ type: 'START_ENGINE_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'START_ENGINE_ERROR', error }))
  }

  return { ...state, startEngine }
}
