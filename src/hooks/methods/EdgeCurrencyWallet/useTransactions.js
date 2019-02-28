// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useTransactions = () => {
  const { pending, error, data, reset, onStart, onSuccess, onError } = useAsync()

  const getTransactions = (wallet: EdgeCurrencyWallet, options?: EdgeGetTransactionsOptions = {}) => {
    onStart()
    return wallet
      .getTransactions(options)
      .then(onSuccess)
      .catch(onError)
  }

  return { pending, error, transactions: data, getTransactions, reset }
}
