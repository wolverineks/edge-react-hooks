import { EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useEnabledTokens = (wallet: EdgeCurrencyWallet) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string[]>({ pending: true })

  React.useEffect(() => {
    wallet.getEnabledTokens().then(onSuccess).catch(onError)
  }, [onError, onSuccess, wallet])

  return {
    enabledTokens: data,
    error,
    pending,
  }
}
