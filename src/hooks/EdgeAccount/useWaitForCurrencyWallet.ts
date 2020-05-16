import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useWaitForCurrencyWallet = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const waitForCurrencyWallet = React.useCallback(
    (...args: Parameters<EdgeAccount['waitForCurrencyWallet']>) => {
      onStart()
      account
        .waitForCurrencyWallet(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    pending,
    reset,
    waitForCurrencyWallet,
    wallet: data,
  }
}
