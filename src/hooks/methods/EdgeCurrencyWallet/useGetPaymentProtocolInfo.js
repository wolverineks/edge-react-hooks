// @flow

import { type EdgeCurrencyWallet, type EdgePaymentProtocolInfo } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetPaymentProtocolInfo = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getPaymentProtocolInfo = (wallet: EdgeCurrencyWallet, url: string) => {
    onStart()
    return wallet
      .getPaymentProtocolInfo(url)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getPaymentProtocolInfo,
    paymentProtocolInfo: (data: ?EdgePaymentProtocolInfo),
    pending,
    reset,
  }
}
