// @flow

import { type EdgeAccount, type EdgeWalletStates } from 'edge-core-js'
import { useReducer } from 'react'

type ChangeStatesStart = {| type: 'CHANGE_STATES_START' |}
type ChangeStatesSuccess = {| type: 'CHANGE_STATES_SUCCESS' |}
type ChangeStatesError = {| error: Error, type: 'CHANGE_STATES_ERROR' |}
type Action = ChangeStatesStart | ChangeStatesSuccess | ChangeStatesError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_STATES_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CHANGE_STATES_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CHANGE_STATES_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useChangeWalletStates = (account: EdgeAccount | null | void, walletStates: EdgeWalletStates) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const activateWallet = () => {
    if (!account || !walletStates) return
    dispatch({ type: 'CHANGE_STATES_START' })
    account
      .changeWalletStates(walletStates)
      .then(() => dispatch({ type: 'CHANGE_STATES_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CHANGE_STATES_ERROR', error }))
  }

  return { ...state, activateWallet }
}
