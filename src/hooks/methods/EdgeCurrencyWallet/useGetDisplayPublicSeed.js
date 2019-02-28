// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetDisplayPublicSeed = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getDisplayPublicSeed = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return Promise.resolve(wallet.getDisplayPublicSeed())
      .then(onSuccess)
      .catch(onError)
  }

  return { getDisplayPublicSeed, ...rest }
}
