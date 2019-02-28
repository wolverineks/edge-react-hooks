// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useParseUri = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const parseUri = (wallet: EdgeCurrencyWallet, uri: string) => {
    onStart()
    return wallet
      .parseUri(uri)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    parseUri,
    parsedUri: data,
    pending,
  }
}
