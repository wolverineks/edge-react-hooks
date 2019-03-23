// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useParseUri = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const parseUri = (wallet: EdgeCurrencyWallet, uri: string) => {
    onStart()
    wallet
      .parseUri(uri)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    parseUri,
    parsedUri: data,
    pending,
    reset,
  }
}
