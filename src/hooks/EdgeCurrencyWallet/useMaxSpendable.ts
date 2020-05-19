import { EdgeCurrencyWallet, EdgeSpendInfo } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useMaxSpendable = (wallet: EdgeCurrencyWallet, { spendInfo }: { spendInfo: EdgeSpendInfo }) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string>()

  React.useEffect(() => {
    wallet.getMaxSpendable(spendInfo).then(onSuccess).catch(onError)
  }, [onError, onSuccess, spendInfo, wallet])

  return {
    maxSpendable: data,
    error,
    pending,
  }
}
