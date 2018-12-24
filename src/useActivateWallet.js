// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type ActivateWalletStart = {| type: 'ACTIVATE_WALLET_START' |}
type ActivateWalletSuccess = {| type: 'ACTIVATE_WALLET_SUCCESS' |}
type ActivateWalletError = {| error: Error, type: 'ACTIVATE_WALLET_ERROR' |}

type Action = ActivateWalletStart | ActivateWalletSuccess | ActivateWalletError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ACTIVATE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ACTIVATE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ACTIVATE_WALLET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useActivateWallet = (account: EdgeAccount | null | void, walletId: string | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const activateWallet = () => {
    if (!account || !account.loggedIn || !walletId) return
    dispatch({ type: 'ACTIVATE_WALLET_START' })
    account
      .changeWalletStates({ [walletId]: { archived: false } })
      .then(() => dispatch({ type: 'ACTIVATE_WALLET_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ACTIVATE_WALLET_ERROR', error }))
  }

  return { ...state, activateWallet }
}
