import { EdgeCurrencyWallet, EdgePaymentProtocolInfo } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const usePaymentProtocolInfo = (wallet: EdgeCurrencyWallet, { uri }: { uri: string }) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgePaymentProtocolInfo>({ pending: true })

  React.useEffect(() => {
    wallet.getPaymentProtocolInfo(uri).then(onSuccess).catch(onError)
  }, [onError, onSuccess, uri, wallet])

  return {
    paymentProtocolInfo: data,
    error,
    pending,
  }
}
