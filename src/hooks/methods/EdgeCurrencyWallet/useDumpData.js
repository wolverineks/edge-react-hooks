// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDumpData = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const dumpData = (wallet: EdgeCurrencyWallet) => {
    onStart()
    return wallet
      .dumpData()
      .then(onSuccess)
      .catch(onError)
  }

  return { dumpData, ...rest }
}
