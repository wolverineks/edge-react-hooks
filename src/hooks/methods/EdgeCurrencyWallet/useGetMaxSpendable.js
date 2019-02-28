// @flow

import { type EdgeCurrencyWallet, type EdgeSpendInfo } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetMaxSpendable = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getMaxSpendable = (wallet: EdgeCurrencyWallet, spendInfo: EdgeSpendInfo) => {
    onStart()
    return wallet
      .getMaxSpendable(spendInfo)
      .then(onSuccess)
      .catch(onError)
  }

  return { getMaxSpendable, ...rest }
}
