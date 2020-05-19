import { EdgeCurrencyWallet, EdgeGetTransactionsOptions, EdgeTransaction } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

import { useOnNewTransactions, useOnTransactionsChanged } from './useOn'

export const useTransactions = (
  wallet: EdgeCurrencyWallet,
  {
    currencyCode,
    denomination,
    startDate,
    startEntries,
    startIndex,
    endDate,
    searchString,
    returnEntries,
    returnIndex,
  }: EdgeGetTransactionsOptions,
) => {
  const { data, onSuccess, onError, pending, error } = useAsync<EdgeTransaction[]>()

  const getTransactions = React.useCallback(() => {
    wallet
      .getTransactions({
        currencyCode,
        denomination,
        startDate,
        startEntries,
        startIndex,
        endDate,
        searchString,
        returnEntries,
        returnIndex,
      })
      .then(onSuccess)
      .catch(onError)
  }, [
    currencyCode,
    denomination,
    endDate,
    onError,
    onSuccess,
    returnEntries,
    returnIndex,
    searchString,
    startDate,
    startEntries,
    startIndex,
    wallet,
  ])

  React.useEffect(() => {
    getTransactions()
  }, [getTransactions])

  useOnNewTransactions(wallet, getTransactions)
  useOnTransactionsChanged(wallet, getTransactions)

  return {
    error,
    pending,
    transactions: data,
  }
}
