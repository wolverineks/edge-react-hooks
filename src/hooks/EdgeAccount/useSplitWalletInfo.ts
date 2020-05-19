import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useSplitWalletInfo = (
  account: EdgeAccount,
  { walletId, newWalletType }: { walletId: string; newWalletType: string },
) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string>({ pending: true })

  React.useEffect(() => {
    account.splitWalletInfo(walletId, newWalletType).then(onSuccess).catch(onError)
  }, [account, newWalletType, onError, onSuccess, walletId])

  return {
    data: data,
    error,
    pending,
  }
}
