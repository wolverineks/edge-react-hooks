// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSweepPrivateKeys = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const sweepPrivateKeys = (wallet: EdgeCurrencyWallet, spendInfo: EdgeSpendInfo) => {
    onStart()
    wallet
      .sweepPrivateKeys(spendInfo)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    sweepPrivateKeys,
    transaction: data,
  }
}
