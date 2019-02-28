// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetNumTransactions = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getNumTransactions = (wallet: EdgeCurrencyWallet, options?: EdgeCurrencyCodeOptions) => {
    onStart()
    return wallet
      .getNumTransactions(options)
      .then(onSuccess)
      .catch(onError)
  }

  return { getNumTransactions, ...rest }
}
