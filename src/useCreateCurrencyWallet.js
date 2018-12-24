// @flow

import { type EdgeAccount, type EdgeCreateCurrencyWalletOptions } from 'edge-core-js'
import { useReducer } from 'react'

type CreateCurrencyWalletStart = {| type: 'CREATE_CURRENCY_WALLET_START' |}
type CreateCurrencyWalletSuccess = {| type: 'CREATE_CURRENCY_WALLET_SUCCESS' |}
type CreateCurrencyWalletError = {| error: Error, type: 'CREATE_CURRENCY_WALLET_ERROR' |}

type Action = CreateCurrencyWalletStart | CreateCurrencyWalletSuccess | CreateCurrencyWalletError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CREATE_CURRENCY_WALLET_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CREATE_CURRENCY_WALLET_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'CREATE_CURRENCY_WALLET_ERROR': {
      return { ...state, pending: true, error: action.error }
    }
    default:
      return state
  }
}

export const useCreateCurrencyWallet = (
  account: EdgeAccount | null | void,
  type: string,
  options: EdgeCreateCurrencyWalletOptions | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createCurrencyWallet = () => {
    if (!account || !account.loggedIn || !type) return
    dispatch({ type: 'CREATE_CURRENCY_WALLET_START' })
    account
      .createCurrencyWallet(type, options || undefined)
      .then(() => dispatch({ type: 'CREATE_CURRENCY_WALLET_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'CREATE_CURRENCY_WALLET_ERROR', error }))
  }

  return { ...state, createCurrencyWallet }
}
