// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useNativeToDenomination = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const nativeToDenomination = (wallet: EdgeCurrencyWallet, nativeAmount: string, currencyCode: string) => {
    onStart()
    return wallet
      .nativeToDenomination(nativeAmount, currencyCode)
      .then(onSuccess)
      .catch(onError)
  }

  return { nativeToDenomination, ...rest }
}
