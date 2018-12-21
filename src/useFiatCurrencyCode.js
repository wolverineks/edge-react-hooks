// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type WRITE_FIAT_CURRENCY_CODE_START = {| type: 'WRITE_FIAT_CURRENCY_CODE_START' |}
type WRITE_FIAT_CURRENCY_CODE_SUCCESS = {| fiatCurrencyCode: string, type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS' |}
type WRITE_FIAT_CURRENCY_CODE_ERROR = {| error: Error, type: 'WRITE_FIAT_CURRENCY_CODE_ERROR' |}
type READ_FIAT_CURRENCY_CODE_SUCCESS = {| fiatCurrencyCode: string, type: 'READ_FIAT_CURRENCY_CODE_SUCCESS' |}
type Action =
  | WRITE_FIAT_CURRENCY_CODE_START
  | WRITE_FIAT_CURRENCY_CODE_SUCCESS
  | WRITE_FIAT_CURRENCY_CODE_ERROR
  | READ_FIAT_CURRENCY_CODE_SUCCESS

type State = {
  error: Error | null,
  fiatCurrencyCode: string | null,
  pending: boolean
}

const initialState: State = {
  fiatCurrencyCode: null,
  pending: false,
  error: null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'WRITE_FIAT_CURRENCY_CODE_START': {
      return { ...state, pending: true, error: null }
    }

    case 'READ_FIAT_CURRENCY_CODE_SUCCESS':
    case 'WRITE_FIAT_CURRENCY_CODE_SUCCESS': {
      return { ...state, pending: false, fiatCurrencyCode: action.fiatCurrencyCode }
    }

    case 'WRITE_FIAT_CURRENCY_CODE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
}

export const useFiatCurrencyCode = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setFiatCurrencyCode = (fiatCurrencyCode: string) => {
    if (!wallet) return
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_START' })
    wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(() => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode }))
      .catch((error: Error) => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_ERROR', error }))
  }

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({ type: 'READ_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode: wallet.fiatCurrencyCode })
    const unsubscribe = wallet.watch(
      'fiatCurrencyCode',
      (fiatCurrencyCode: $PropertyType<EdgeCurrencyWallet, 'fiatCurrencyCode'>) =>
        dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode })
    ) // mount with wallet / null -> wallet / walletA -> walletB (2)
    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state, setFiatCurrencyCode }
}
