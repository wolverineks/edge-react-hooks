import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useCreateCurrencyWallet = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const createCurrencyWallet = React.useCallback(
    (...args: Parameters<EdgeAccount['createCurrencyWallet']>) => {
      onStart()
      account
        .createCurrencyWallet(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    createCurrencyWallet,
    error,
    pending,
    reset,
    wallet: data,
  }
}
