// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useEnableTokens = () => {
  const { onStart, onSuccess, onError, error, pending } = useAsync()

  const enableTokens = (wallet: EdgeCurrencyWallet, tokens: Array<string>) => {
    onStart()
    return wallet
      .enableTokens(tokens)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    enableTokens,
    error,
    pending,
  }
}
