// @flow

import { type EdgeCurrencyWallet, type EdgeTokenInfo } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useAddCustomToken = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const addCustomToken = (wallet: EdgeCurrencyWallet, tokenInfo: EdgeTokenInfo) => {
    onStart()
    wallet
      .addCustomToken(tokenInfo)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    addCustomToken,
    error,
    pending,
    reset,
  }
}
