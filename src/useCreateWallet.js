// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type CreateWalletStart = {| type: 'CREATE_WALLET_START' |}
type CreateWalletSuccess = {| type: 'CREATE_WALLET_SUCCESS' |}
type CreateWalletError = {| error: Error, type: 'CREATE_WALLET_ERROR' |}

type Action = CreateWalletStart | CreateWalletSuccess | CreateWalletError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CREATE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CREATE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CREATE_WALLET_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useCreateWallet = (account: ?EdgeAccount, type: ?string, keys: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createWallet = () => {
    if (!account || !account.loggedIn || !type || !keys) return
    dispatch({ type: 'CREATE_WALLET_START' })
    account
      .createWallet(type, keys)
      .then(() => dispatch({ type: 'CREATE_WALLET_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CREATE_WALLET_ERROR', error }))
  }

  return { ...state, createWallet }
}
