import { EdgeCurrencyWallet, EdgeParsedUri } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useParsedUri = (
  wallet: EdgeCurrencyWallet,
  { uri, currencyCode }: { uri: string; currencyCode?: string },
) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgeParsedUri>({ pending: true })

  React.useEffect(() => {
    wallet.parseUri(uri, currencyCode).then(onSuccess).catch(onError)
  }, [currencyCode, onError, onSuccess, uri, wallet])

  return {
    parsedUri: data,
    error,
    pending,
  }
}
