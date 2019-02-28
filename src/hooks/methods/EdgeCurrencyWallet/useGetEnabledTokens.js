// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetEnabledTokens = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getEnabledTokens = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return wallet
      .getEnabledTokens()
      .then(onSuccess)
      .catch(onError)
  }

  return { getEnabledTokens, ...rest }
}
