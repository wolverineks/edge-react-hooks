// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetDisplayPrivateSeed = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getDisplayPrivateSeed = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return Promise.resolve(wallet.getDisplayPrivateSeed())
      .then(onSuccess)
      .catch(onError)
  }

  return { getDisplayPrivateSeed, ...rest }
}
