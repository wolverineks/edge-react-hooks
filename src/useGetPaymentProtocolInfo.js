// @flow

import { type EdgeCurrencyWallet, type EdgePaymentProtocolInfo } from 'edge-core-js'
import { useReducer } from 'react'

type GetPaymentProtocolInfoStart = {| type: 'GET_PAYMENT_PROTOCOL_INFO_START' |}
type GetPaymentProtocolInfoSuccess = {|
  paymentProtocolInfo: EdgePaymentProtocolInfo,
  type: 'GET_PAYMENT_PROTOCOL_INFO_SUCCESS'
|}
type GetPaymentProtocolInfoError = {| error: Error, type: 'GET_PAYMENT_PROTOCOL_INFO_ERROR' |}
type Action = GetPaymentProtocolInfoStart | GetPaymentProtocolInfoSuccess | GetPaymentProtocolInfoError
type State = {| error: Error | null, paymentProtocolInfo: EdgePaymentProtocolInfo | null, pending: boolean |}

const initialState: State = { pending: false, error: null, paymentProtocolInfo: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_PAYMENT_PROTOCOL_INFO_START': {
      return { ...state, pending: true, error: null }
    }
    case 'GET_PAYMENT_PROTOCOL_INFO_SUCCESS': {
      return { ...state, pending: false, paymentProtocolInfo: action.paymentProtocolInfo }
    }
    case 'GET_PAYMENT_PROTOCOL_INFO_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useGetPaymentProtocolInfo = (
  wallet: EdgeCurrencyWallet | null | void,
  paymentProtocolUrl: string | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getPaymentProtocolInfo = () => {
    if (!wallet || !paymentProtocolUrl) return
    dispatch({ type: 'GET_PAYMENT_PROTOCOL_INFO_START' })
    wallet
      .getPaymentProtocolInfo(paymentProtocolUrl)
      .then((paymentProtocolInfo: EdgePaymentProtocolInfo) =>
        dispatch({ type: 'GET_PAYMENT_PROTOCOL_INFO_SUCCESS', paymentProtocolInfo })
      )
      .catch((error: Error) => dispatch({ type: 'GET_PAYMENT_PROTOCOL_INFO_ERROR', error }))
  }

  return { ...state, getPaymentProtocolInfo }
}
