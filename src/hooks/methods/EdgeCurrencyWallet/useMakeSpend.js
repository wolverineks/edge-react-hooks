// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo, type EdgeTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useMakeSpend = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const makeSpend = (wallet: EdgeCurrencyWallet, spendInfo: EdgeSpendInfo) => {
    onStart()
    return wallet
      .makeSpend(spendInfo)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    makeSpend,
    pending,
    reset,
    transaction: (data: ?EdgeTransaction),
  }
}
