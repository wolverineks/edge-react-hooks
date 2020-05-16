import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeAccount } from '../../types'

export const useListWalletIds = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const listWalletIds = React.useCallback(
    (...args: Parameters<EdgeAccount['listWalletIds']>) => {
      onStart()
      Promise.resolve(account.listWalletIds(...args))
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    listWalletIds,
    pending,
    reset,
    walletIds: data,
  }
}
