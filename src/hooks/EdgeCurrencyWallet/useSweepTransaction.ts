import { EdgeCurrencyWallet, EdgeSpendInfo, EdgeTransaction } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useSweepTransaction = (wallet: EdgeCurrencyWallet, { spendInfo }: { spendInfo: EdgeSpendInfo }) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgeTransaction>({ pending: true })

  React.useEffect(() => {
    wallet.sweepPrivateKeys(spendInfo).then(onSuccess).catch(onError)
  }, [onError, onSuccess, spendInfo, wallet])

  return {
    transaction: data,
    error,
    pending,
  }
}
