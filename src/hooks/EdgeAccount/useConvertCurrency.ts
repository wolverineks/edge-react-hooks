import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useConvertCurrency = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const convertCurrency = React.useCallback(
    (...args: Parameters<EdgeAccount['rateCache']['convertCurrency']>) => {
      onStart()
      account.rateCache
        .convertCurrency(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account.rateCache, onError, onStart, onSuccess],
  )

  return {
    convertCurrency,
    error,
    pending,
    reset,
  }
}
