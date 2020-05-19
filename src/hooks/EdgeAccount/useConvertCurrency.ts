import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useConvertCurrency = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<number>()

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
    amount: data,
    convertCurrency,
    error,
    pending,
    reset,
  }
}
