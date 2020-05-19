import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useDenominationToNative = (
  wallet: EdgeCurrencyWallet,
  { denomimatedAmount, currencyCode }: { denomimatedAmount: string; currencyCode: string },
) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string>({ pending: true })

  React.useEffect(() => {
    wallet.denominationToNative(denomimatedAmount, currencyCode).then(onSuccess).catch(onError)
  }, [currencyCode, denomimatedAmount, onError, onSuccess, wallet])

  return {
    nativeAmount: data,
    error,
    pending,
  }
}
