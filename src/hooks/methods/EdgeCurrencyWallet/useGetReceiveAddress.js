// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetReceiveAddress = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()
  const getReceiveAddress = (wallet: EdgeCurrencyWallet, options?: EdgeCurrencyCodeOptions) => {
    onStart()
    return wallet
      .getReceiveAddress(options)
      .then(onSuccess)
      .catch(onError)
  }

  return { getReceiveAddress, ...rest }
}
