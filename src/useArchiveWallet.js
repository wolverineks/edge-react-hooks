// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useReducer } from 'react'

type ArchiveWalletStart = {| type: 'ARCHIVE_WALLET_START' |}
type ArchiveWalletSuccess = {| type: 'ARCHIVE_WALLET_SUCCESS' |}
type ArchiveWalletError = {| error: Error, type: 'ARCHIVE_WALLET_ERROR' |}

type Action = ArchiveWalletStart | ArchiveWalletSuccess | ArchiveWalletError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ARCHIVE_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'ARCHIVE_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'ARCHIVE_WALLET_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useArchiveWallet = (account: EdgeAccount | null | void, walletId: string | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const archiveWallet = () => {
    if (!account || !walletId) return
    dispatch({ type: 'ARCHIVE_WALLET_START' })
    account
      .changeWalletStates({ [walletId]: { archived: true } })
      .then(() => dispatch({ type: 'ARCHIVE_WALLET_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'ARCHIVE_WALLET_ERROR', error }))
  }

  return { ...state, archiveWallet }
}
