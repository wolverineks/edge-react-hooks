import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useGetWalletInfo = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getWalletInfo = React.useCallback(
    (...args: Parameters<EdgeAccount['getWalletInfo']>) => {
      onStart()
      Promise.resolve(account.getWalletInfo(...args))
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    getWalletInfo,
    pending,
    reset,
    walletInfo: data,
  }
}
