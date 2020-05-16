import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useGetFirstWalletInfo = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getFirstWalletInfo = React.useCallback(
    (...args: Parameters<EdgeAccount['getFirstWalletInfo']>) => {
      onStart()
      Promise.resolve(account.getFirstWalletInfo(...args))
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    getFirstWalletInfo,
    pending,
    reset,
    walletInfo: data,
  }
}
