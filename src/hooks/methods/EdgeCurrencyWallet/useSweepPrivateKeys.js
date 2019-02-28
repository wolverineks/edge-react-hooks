// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSweepPrivateKeys = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const sweepPrivateKeys = (wallet: EdgeCurrencyWallet, spendInfo: EdgeSpendInfo) => {
    onStart()
    return wallet
      .sweepPrivateKeys(spendInfo)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    sweepPrivateKeys,
    transaction: (data: ?EdgeTransaction),
  }
}
