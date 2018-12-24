// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEffect, useReducer } from 'react'
import { useRef, useState } from 'react'

type ConvertCurrencyStart = {| type: 'CONVERT_CURRENCY_START' |}
type ConvertCurrencySuccess = {| amount: number, type: 'CONVERT_CURRENCY_SUCCESS' |}
type ConvertCurrencyError = {| error: Error, type: 'CONVERT_CURRENCY_ERROR' |}
type Action = ConvertCurrencyStart | ConvertCurrencySuccess | ConvertCurrencyError

type State = {| amount: number | null, error: Error | null, pending: boolean |}

const initialState: State = { amount: null, pending: false, error: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CONVERT_CURRENCY_START': {
      return { ...state, pending: true, error: null }
    }
    case 'CONVERT_CURRENCY_SUCCESS': {
      return { ...state, pending: false, amount: action.amount }
    }
    case 'CONVERT_CURRENCY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useConvertCurrency = (
  account: EdgeAccount | null | void,
  fromCurrency: string | null | void,
  toCurrency: string | null | void,
  amount: number | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!account || !account.loggedIn || !account.rateCache || !fromCurrency || !toCurrency || !amount) return // mount with null
    dispatch({ type: 'CONVERT_CURRENCY_START' })
    account.rateCache
      .convertCurrency(fromCurrency, toCurrency, amount)
      .then((amount: number) => dispatch({ type: 'CONVERT_CURRENCY_SUCCESS', amount }))
      .catch((error: Error) => dispatch({ type: 'CONVERT_CURRENCY_ERROR', error })) // mount with account / null -> accoun / accounA -> accounB

    const unsubscribe = account.rateCache.on('update', () => {
      if (!account || !account.loggedIn || !account.rateCache || !fromCurrency || !toCurrency || !amount) return
      account.rateCache
        .convertCurrency(fromCurrency, toCurrency, amount)
        .then((amount: number) => dispatch({ type: 'CONVERT_CURRENCY_SUCCESS', amount }))
        .catch((error: Error) => dispatch({ type: 'CONVERT_CURRENCY_ERROR', error }))
    })
    return unsubscribe // unmount with account / accountA -> accountB (1) / account -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [account, fromCurrency, toCurrency, amount]) // onUpdate

  return state
}
