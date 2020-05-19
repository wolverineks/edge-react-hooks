import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useWaitForCurrencyWallet = (account: EdgeAccount, { walletId }: { walletId: string }) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgeCurrencyWallet>({ pending: true })

  React.useEffect(() => {
    account.waitForCurrencyWallet(walletId).then(onSuccess).catch(onError)
  }, [account, onError, onSuccess, walletId])

  return {
    error,
    pending,
    wallet: data,
  }
}
