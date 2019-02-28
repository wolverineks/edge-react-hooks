// @flow

import { type EdgeCurrencyWallet, type EdgeEncodeUri } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useEncodeUri = () => {
  const { onStart, onSuccess, onError, error, pending, data } = useAsync()

  const encodeUri = (wallet: EdgeCurrencyWallet, encodeUri: EdgeEncodeUri) => {
    onStart()
    return wallet
      .encodeUri(encodeUri)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    encodeUri,
    error,
    pending,
    uri: (data: ?string),
  }
}
