import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useSplitWalletInfo = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const splitWalletInfo = React.useCallback(
    (...args: Parameters<EdgeAccount['splitWalletInfo']>) => {
      onStart()
      account
        .splitWalletInfo(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    data: data,
    error,
    pending,
    reset,
    splitWalletInfo,
  }
}
