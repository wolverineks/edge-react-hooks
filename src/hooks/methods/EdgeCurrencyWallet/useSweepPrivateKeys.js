// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSweepPrivateKeys = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const sweepPrivateKeys = (wallet: EdgeCurrencyWallet, spendInfo: EdgeSpendInfo) => {
    onStart()
    return wallet
      .sweepPrivateKeys(spendInfo)
      .then(onSuccess)
      .catch(onError)
  }

  return { sweepPrivateKeys, ...rest }
}
