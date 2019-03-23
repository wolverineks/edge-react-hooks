// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useConvertCurrency = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const convertCurrency = (account: EdgeAccount, fromCurrency: string, toCurrency: string, amount: number) => {
    onStart()
    return account.rateCache
      .convertCurrency(fromCurrency, toCurrency, amount)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    convertCurrency,
    error,
    pending,
    reset,
  }
}
