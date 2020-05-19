import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useSplittableWalletTypes = (account: EdgeAccount, { walletId }: { walletId: string }) => {
  const { onSuccess, onError, pending, error, data } = useAsync({ pending: true })

  React.useEffect(() => {
    account.listSplittableWalletTypes(walletId).then(onSuccess).catch(onError)
  }, [account, onError, onSuccess, walletId])

  return {
    error,
    pending,
    splittalbleWalletTypes: data,
  }
}
