// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

type WRITE_FIAT_CURRENCY_CODE_START = {|
  type: 'WRITE_FIAT_CURRENCY_CODE_START'
|}
type WRITE_FIAT_CURRENCY_CODE_SUCCESS = {|
  fiatCurrencyCode: string,
  type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS'
|}
type WRITE_FIAT_CURRENCY_CODE_ERROR = {|
  error: Error,
  type: 'WRITE_FIAT_CURRENCY_CODE_ERROR'
|}
type READ_FIAT_CURRENCY_CODE_SUCCESS = {|
  fiatCurrencyCode: string,
  type: 'READ_FIAT_CURRENCY_CODE_SUCCESS'
|}
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
      const { fiatCurrencyCode } = action
      return { ...state, pending: false, fiatCurrencyCode }
    }
    case 'WRITE_FIAT_CURRENCY_CODE_ERROR': {
      const { error } = action
      return { ...state, pending: false, error }
    }
    default:
      return state
  }
}

export const useFiatCurrencyCode = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSuccess = (fiatCurrencyCode: string) => () =>
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode })
  const onError = (error: Error) => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_ERROR', error })

  const setFiatCurrencyCode = (fiatCurrencyCode: string) => {
    if (!wallet) return
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_START' })
    wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(onSuccess(fiatCurrencyCode))
      .catch(onError)
  }

  const effect = () => {
    if (!wallet) return // mount with null
    dispatch({
      type: 'READ_FIAT_CURRENCY_CODE_SUCCESS',
      fiatCurrencyCode: wallet.fiatCurrencyCode
    })

    const unsubscribe = wallet.watch(
      // mount with wallet / null -> wallet / walletA -> walletB (2)
      'fiatCurrencyCode',
      (fiatCurrencyCode: $PropertyType<EdgeCurrencyWallet, 'fiatCurrencyCode'>) =>
        dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS', fiatCurrencyCode })
    )

    return unsubscribe // unmount with wallet / walletA -> walletB (1) / wallet -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [wallet]) // onUpdate

  return { ...state, setFiatCurrencyCode }
}
