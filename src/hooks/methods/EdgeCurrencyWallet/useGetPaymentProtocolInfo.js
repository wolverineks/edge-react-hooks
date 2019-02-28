// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetPaymentProtocolInfo = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getPaymentProtocolInfo = (wallet: EdgeCurrencyWallet, url: string) => {
    onStart()
    return wallet
      .getPaymentProtocolInfo(url)
      .then(onSuccess)
      .catch(onError)
  }

  return { getPaymentProtocolInfo, ...rest }
}
