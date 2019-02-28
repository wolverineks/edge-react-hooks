// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useParseUri = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const parseUri = (wallet: EdgeCurrencyWallet, uri: string) => {
    onStart()
    return wallet
      .parseUri(uri)
      .then(onSuccess)
      .catch(onError)
  }

  return { parseUri, ...rest }
}
