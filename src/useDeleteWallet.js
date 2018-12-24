// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type DeleteWalletStart = {| type: 'DELETE_WALLET_START' |}
type DeleteWalletSuccess = {| type: 'DELETE_WALLET_SUCCESS' |}
type DeleteWalletError = {| error: Error, type: 'DELETE_WALLET_ERROR' |}
type Action = DeleteWalletStart | DeleteWalletSuccess | DeleteWalletError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DELETE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'DELETE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'DELETE_WALLET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useDeleteWallet = (account: EdgeAccount | null | void, walletId: string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const deleteWallet = () => {
    if (!account) return
    dispatch({ type: 'DELETE_WALLET_START' })
    account
      .changeWalletStates({ [walletId]: { deleted: true } })
      .then(() => dispatch({ type: 'DELETE_WALLET_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'DELETE_WALLET_ERROR', error }))
  }

  return { ...state, deleteWallet }
}
