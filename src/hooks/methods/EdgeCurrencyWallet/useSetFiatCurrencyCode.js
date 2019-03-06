// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSetFiatCurrencyCode = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const setFiatCurrencyCode = (wallet: EdgeCurrencyWallet, fiatCurrencyCode: string) => {
    onStart()
    return wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    setFiatCurrencyCode,
  }
}
