// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetEnabledTokens = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getEnabledTokens = (wallet: EdgeCurrencyWallet) => {
    onStart()
    wallet
      .getEnabledTokens()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    enabledTokens: data,
    error,
    getEnabledTokens,
    pending,
    reset,
  }
}
