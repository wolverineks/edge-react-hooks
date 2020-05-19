import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useNativeToDenomination = (
  wallet: EdgeCurrencyWallet,
  { nativeAmount, currencyCode }: { nativeAmount: string; currencyCode: string },
) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string>({ pending: true })

  React.useEffect(() => {
    wallet.nativeToDenomination(nativeAmount, currencyCode).then(onSuccess).catch(onError)
  }, [currencyCode, nativeAmount, onError, onSuccess, wallet])

  return {
    amount: data,
    error,
    pending,
  }
}
