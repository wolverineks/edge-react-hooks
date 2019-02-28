// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSetFiatCurrencyCode = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const setFiatCurrencyCode = (wallet: EdgeCurrencyWallet, fiatCurrencyCode: string) => {
    onStart()
    return wallet
      .setFiatCurrencyCode(fiatCurrencyCode)
      .then(onSuccess)
      .catch(onError)
  }

  return { setFiatCurrencyCode, ...rest }
}
