// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDenominationToNative = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const denominationToNative = (wallet: EdgeCurrencyWallet, denominatedAmount: string, currencyCode: string) => {
    onStart()
    return wallet
      .denominationToNative(denominatedAmount, currencyCode)
      .then(onSuccess)
      .catch(onError)
  }

  return { denominationToNative, ...rest }
}
