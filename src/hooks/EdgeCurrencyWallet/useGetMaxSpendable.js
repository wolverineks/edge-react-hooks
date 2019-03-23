// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetMaxSpendable = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getMaxSpendable = (wallet: EdgeCurrencyWallet, spendInfo: EdgeSpendInfo) => {
    onStart()
    wallet
      .getMaxSpendable(spendInfo)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getMaxSpendable,
    maxSpendable: data,
    pending,
    reset,
  }
}
