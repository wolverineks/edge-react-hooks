// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useReducer } from 'react'

type WriteFiatCurrencyCodeStart = {| type: 'WRITE_FIAT_CURRENCY_CODE_START' |}
type WriteFiatCurrencyCodeSuccess = {| type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS' |}
type WriteFiatCurrencyCodeError = {| error: Error, type: 'WRITE_FIAT_CURRENCY_CODE_ERROR' |}
type Action = WriteFiatCurrencyCodeStart | WriteFiatCurrencyCodeSuccess | WriteFiatCurrencyCodeError

type State = {| error: Error | null, pending: boolean |}

const initialState: State = { pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'WRITE_FIAT_CURRENCY_CODE_START': {
      return { ...state, pending: true, error: null }
    }
    case 'WRITE_FIAT_CURRENCY_CODE_SUCCESS': {
      return { ...state, pending: false }
    }
    case 'WRITE_FIAT_CURRENCY_CODE_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSetFiatCurrencyCode = (
  wallet: EdgeCurrencyWallet | null | void,
  fiatCurrencyCode: string | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setFiatCurrencyCode = () => {
    if (!wallet || !fiatCurrencyCode) return
    dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_START' })
    wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(() => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_SUCCESS' }))
      .catch((error: Error) => dispatch({ type: 'WRITE_FIAT_CURRENCY_CODE_ERROR', error }))
  }

  return { ...state, setFiatCurrencyCode }
}
