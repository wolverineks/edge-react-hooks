// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDisableTokens = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const disableTokens = (wallet: EdgeCurrencyWallet, tokens: Array<string>) => {
    onStart()
    return wallet
      .disableTokens(tokens)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    disableTokens,
    error,
    pending,
  }
}
